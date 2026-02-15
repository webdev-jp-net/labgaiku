# NextAuth認証仕様

## 概要
Google OAuthを利用したNextAuth.js 4系の構成。JWTセッションストラテジーでユーザー情報を保持する。データベースは使用せず、microCMSと組み合わせて最低限の認証機能を提供。

## 環境変数
- `NEXTAUTH_URL`: アプリのベースURL
- `NEXTAUTH_SECRET`: JWT署名キー（ランダム生成）
- `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`: Google Cloud Consoleから取得

## ディレクトリ構成
- `src/lib/auth.ts`: `authOptions`の定義
  - Google Provider設定
  - `signIn`コールバックでドメイン・メールアドレスによるアクセス制限
  - `jwt`/`session`コールバックでメール・名前・アイコンをJWTに保存
- `src/middleware.ts`: 認証ミドルウェア
  - `getToken`によるJWTトークン検証
  - 認証不要パス（`/`, `/api/auth`）の制御
  - 未認証時は`/`にリダイレクト
- `src/app/api/auth/[...nextauth]/route.ts`: NextAuth APIハンドラ
- `src/components/auth/`: クライアント側ヘルパー
  - `SessionWrapper`: `SessionProvider`のラッパー
  - `SignIn`: `signIn("google", { callbackUrl: "/" })`
  - `SignOut`: ログアウトボタン
- `src/app/layout.tsx`: ルート全体を`SessionWrapper`で囲む

## アクセス制限

### ドメイン制限
`allowedDomains`に定義されたドメインのGoogleアカウントのみログインを許可する。

### 個別メールアドレス許可
`allowedEmails`に定義されたメールアドレスはドメインに関わらずログインを許可する。メールアドレスの判定はドメイン判定より優先される。

### 認証拒否時の挙動
未許可のアカウントでログインを試みた場合、`/?error=unauthorized`にリダイレクトし、ホーム画面にエラーメッセージを表示する。

## ミドルウェアによるルート保護
`src/middleware.ts`で全ルートを一括保護する。

- **認証不要パス**: `/`（ホーム）、`/api/auth/*`（NextAuthエンドポイント）
- **認証必要パス**: 上記以外のすべてのパス
- **静的アセット**: `_next/static`、`_next/image`、`favicon.ico`はmatcherで除外

## フロー
1. Home（`/`）でログインボタンを押すと`signIn("google")`→Google認証画面
2. `signIn`コールバックでドメイン・メールアドレスを検証
3. 許可されたアカウントの場合、認証成功→`/`にリダイレクト
4. 未許可のアカウントの場合、`/?error=unauthorized`にリダイレクト→エラーメッセージ表示
5. 認証済みでmicroCMSのレポート一覧を表示
6. 認証保護ページへの未認証アクセスはミドルウェアが`/`にリダイレクト

## カスタマイズ方針
- ロール等を扱う場合はJWTコールバックにフィールドを追加
- 認証不要ページの追加は`src/middleware.ts`の`publicPaths`に追加
- 共有コンポーネントの追加は`src/components/auth`に集約
