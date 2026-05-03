# NextAuth認証仕様

## 概要
Google OAuthを利用したNextAuth.js 4系の構成。JWTセッションストラテジーでユーザー情報を保持する。データベースは使用せず、microCMSと組み合わせて最低限の認証機能を提供。

アプリ全体を保護するグローバルなアクセス制限は持たず、誰でも Google アカウントでサインイン可能。閲覧範囲の制御は記事単位で `_llm-docs/spec/frontend/microcms.md` の `allowList` フィールドで行う。

## 環境変数
- `NEXTAUTH_URL`: アプリのベースURL
- `NEXTAUTH_SECRET`: JWT署名キー（ランダム生成）
- `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`: Google Cloud Consoleから取得

## ディレクトリ構成
- `src/lib/auth.ts`: `authOptions`の定義
  - Google Provider設定
  - `signIn`コールバックは常に `true` を返す（グローバル制限なし）
  - `jwt`/`session`コールバックでメール・名前・アイコンをJWTに保存
- `src/lib/permissions.ts`: 記事ごとの閲覧可否判定
  - `canViewReport(report, session)` を一覧／詳細の両方で使用
- `src/app/api/auth/[...nextauth]/route.ts`: NextAuth APIハンドラ
- `src/components/auth/`: クライアント側ヘルパー
  - `SessionWrapper`: `SessionProvider`のラッパー
  - `SignIn`: `signIn("google", { callbackUrl: "/" })`
  - `SignOut`: ログアウトボタン
- `src/app/layout.tsx`: ルート全体を`SessionWrapper`で囲む

## アクセス制限

グローバルなドメイン／メールアドレス制限は撤廃。閲覧範囲は記事ごとに以下で制御する:

- `report.visibility`: `secret` / `limited` / `public`
- `report.allowList`: `secret` / `limited` 記事の閲覧許可リスト（メールアドレスとドメインを 1 行 1 件で混在可、`@` の有無で自動判定）

判定の詳細は `src/lib/permissions.ts` を参照。

## ルート保護
ミドルウェアによる一括保護は行わない（`src/middleware.ts` は不要のため未配置）。各ページ／詳細ルートは個別に `canViewReport` で判定し、権限がない場合は `notFound()` を返す。

## フロー
1. `AppHeader` のログインボタンを押すと `signIn("google")` → Google認証画面
2. `signIn` コールバックは常に `true` を返し、誰でも認証成功
3. 認証済みユーザは記事ごとの allowlist に応じて `limited` 記事を閲覧可能
4. `public` 記事は未認証でも閲覧可能
5. `secret` 記事は誰も閲覧不可（一覧除外＋詳細404）

## カスタマイズ方針
- ロール等を扱う場合はJWTコールバックにフィールドを追加
- 共有コンポーネントの追加は`src/components/auth`に集約
