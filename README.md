# Labが行く

「Labが行く」の活動を公開するWebサイトです。

## コンテンツ

インタビュー：  
これまでにインタビューした記事を公開範囲にしたがって掲載しています。

## 技術スタック

- **フロントエンド**: Next.js
- **スタイリング**: SCSS Modules
- **認証**: SSO（Google）
- **OAuth**: Google
- **ホスティング**: 選定中
- **パッケージマネージャー**: pnpm

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

`.env.example`をコピーして`.env`ファイルを作成：

```bash
cp .env.example .env
```

`.env`ファイルを編集して、以下の環境変数を設定：

```env
# Auth.js設定
AUTH_SECRET=your-secret-key-here  # openssl rand -base64 32 で生成
AUTH_TRUST_HOST=true
NEXTAUTH_URL=http://localhost:4321

# Google OAuth（Google Cloud Consoleで取得）
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. OAuth設定

#### Google OAuth
1. [Google Cloud Console](https://console.cloud.google.com/)でプロジェクトを作成
2. OAuth 2.0クライアントIDを作成
3. 承認済みのリダイレクトURIに`http://localhost:4321/api/auth/callback/google`を追加

#### GitHub OAuth
1. [GitHub Developer Settings](https://github.com/settings/developers)でOAuth Appを作成
2. Authorization callback URLに`http://localhost:4321/api/auth/callback/github`を設定

## 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# プレビュー
pnpm preview

# 型チェック
pnpm typecheck

# リント
pnpm lint
pnpm lint:fix

# フォーマット
pnpm format
```
