# Labが行く

TAMSAN Labサークルのインタビュー活動レポート記事を管理・公開するWebアプリケーション

## 概要

「Labが行く」は、TAMSAN Labのインタビュー企画です
ここでは、これまでにインタビューした記事をブログ形式で確認できるアプリケーションを構築します。

## 技術スタック

- **フロントエンド**: 選定中
- **スタイリング**: SCSS Modules
- **認証**: 選定中
- **OAuth**: Google
- **ホスティング**: Vercel
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

## プロジェクト構造

選定中

## 機能

- ✅ SSO認証（Google）
- ✅ 認証保護された記事閲覧
- ✅ Markdown記事管理
- ✅ レスポンシブデザイン
- ✅ エラーハンドリング
- ✅ フラッシュメッセージ

## 記事の追加

選定中

## ライセンス

このプロジェクトはTAMSAN Labの内部プロジェクトです。
