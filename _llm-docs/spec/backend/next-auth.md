# NextAuth認証仕様

## 概要

Google OAuthを利用したNextAuth.js 4系の構成。JWTセッションストラテジーでユーザー情報を保持する。データベースは使用せず、microCMSと組み合わせて最低限の認証機能を提供。

アプリ全体を保護するグローバルなアクセス制限は持たず、誰でもGoogleアカウントでサインイン可能。閲覧範囲の制御は記事単位で`_llm-docs/spec/microcms.md`の`allowList`フィールドで行う。

セッション取得はサーバー側で完結させる方針を採り、`SessionProvider`/`useSession`は使用しない。Client Componentで必要な認証状態は、`(contents)/layout.tsx`のServer Componentが`getServerSession`で取得した`session`をpropで渡す。

## 環境変数

- `NEXTAUTH_URL`: アプリのベースURL
- `NEXTAUTH_SECRET`: JWT署名キー（ランダム生成）
- `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`: Google Cloud Consoleから取得

## ディレクトリ構成

- `src/lib/auth.ts`: `authOptions`の定義
  - Google Provider設定
  - `signIn`コールバックは常に`true`を返す（グローバル制限なし）
  - `jwt`/`session`コールバックでメール・名前・アイコンをJWTに保存
- `src/lib/permission.ts`: 記事ごとの閲覧可否判定
  - `canViewInterview(interview, session)`を一覧/詳細の両方で使用
- `src/app/api/auth/[...nextauth]/route.ts`: NextAuth APIハンドラー
- `src/app/(contents)/layout.tsx`: `getServerSession(authOptions)`でsessionを取得し、`AppHeader`/`AppFooter`にpropで注入するServer Component

`src/components/auth/`配下の共有コンポーネント（SessionWrapper/SignIn/SignOut）は持たない。`signIn`/`signOut`を呼ぶボタンは、必要箇所（`AppHeader`/`AppFooter`/未認可詳細の`LoginPrompt`）に直接インラインで配置する。

## アクセス制限

グローバルなドメイン/メールアドレス制限は持たない。閲覧範囲は記事ごとに以下で制御する:

- `interview.visibility`:`secret`/`limited`/`public`
- `interview.allowList`:`secret`/`limited`記事の閲覧許可リスト（メールアドレスとドメインを1行1件で混在可、`@`の有無で自動判定）

判定の詳細は`src/lib/permission.ts`を参照。

## ルート保護

ミドルウェアによる一括保護は行わない（`src/middleware.ts`は配置しない）。各ページ/詳細ルートは個別に`canViewInterview`で判定する。

- 一覧では`secret`の非該当記事をフィルターで除外する
- 詳細で非該当だった場合は`notFound()`ではなく、ログイン促しView（`LoginPrompt`）を返す

## フロー

1. `AppHeader`/`AppFooter`/`LoginPrompt`のいずれかにあるログインボタンを押すと`signIn('google')`が呼ばれてGoogle認証画面へ遷移
2. `signIn`/`signOut`は`callbackUrl`を指定せず、操作前のページに戻る挙動とする
3. `signIn`コールバックは常に`true`を返し、誰でも認証成功
4. 認証済みユーザは記事ごとのallowListに応じて`limited`記事を閲覧可能
5. `public`記事は未認証でも閲覧可能
6. `secret`記事は`allowList`該当ユーザのみ閲覧可、それ以外は一覧から除外され、詳細URL直アクセス時はログイン促しViewが返る
