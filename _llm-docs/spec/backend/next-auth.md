# NextAuth認証仕様

## 概要
Google OAuthを利用したNextAuth.js 4系の構成。JWTセッションストラテジーでユーザー情報を保持する。データベースは使用せず、microCMSと組み合わせて最低限の認証機能を提供。

## 環境変数
- `NEXTAUTH_URL`: アプリのベースURL
- `NEXTAUTH_SECRET`: JWT署名キー（ランダム生成）
- `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`: Google Cloud Consoleから取得

## ディレクトリ構成
- `src/lib/auth.ts`: `authOptions`の定義。
  - Google Provider設定
  - `jwt`/`session`コールバックでメール・名前・アイコンをJWTに保存
- `src/app/api/auth/[...nextauth]/route.ts`: NextAuth APIハンドラ
- `src/components/auth/`: クライアント側ヘルパー
  - `SessionWrapper`: `SessionProvider`のラッパー
  - `SignIn`: `signIn("google", { callbackUrl: "/app" })`
  - `SignOut`: ログアウトボタン
- `src/app/layout.tsx`: ルート全体を`SessionWrapper`で囲む

## フロー
1. Home（`/`）で`SignIn`を押すと`signIn("google")`→Google認証画面
2. 認証成功後、`/app`へリダイレクト
3. `/app`ではサーバーコンポーネント内で`getServerSession(authOptions)`を呼び、未認証なら`/api/auth/signin?callbackUrl=%2Fapp`にリダイレクト
4. 認証済みでmicroCMSのレポート一覧を表示

## カスタマイズ方針
- ロール等を扱う場合はJWTコールバックにフィールドを追加
- `/app`以外の認証保護ルートが増えた場合も同様に`getServerSession`で判定
- 共有コンポーネントの追加は`src/components/auth`に集約

