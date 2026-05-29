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
- **ホスティング**: Vercel
- **パッケージマネージャー**: pnpm

## セットアップ

> [!NOTE]
> インタビュー記事の管理にはmicroCMSを利用しており、リポジトリの機構単独では動作しません。

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

`.env.example`をコピーして`.env`ファイルを作成：

```bash
cp .env.example .env
```

`.env`ファイルを編集して、必要な環境変数を設定してください

### 3. OAuth設定

#### Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com/)でプロジェクトを作成
2. OAuth 2.0クライアントIDを作成
3. 承認済みのリダイレクトURIに`http://localhost:3000/api/auth/callback/google`を追加

#### GitHub OAuth

1. [GitHub Developer Settings](https://github.com/settings/developers)でOAuth Appを作成
2. Authorization callback URLに`http://localhost:3000/api/auth/callback/github`を設定

## 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 本番サーバー起動（ビルド後）
pnpm start

# 型チェック
pnpm typecheck

# Lint
pnpm lint
pnpm lint:fix

# フォーマット
pnpm format
```

## License / ライセンス

> [!IMPORTANT]
> This repository uses separate licenses for code and content.  
> 本リポジトリは、コードとコンテンツで異なるライセンスを適用しています。

### Code / コード (ロジック・仕組み)

The software code in this repository is released into the public domain under the **Unlicense**.  
See the `UNLICENSE` file for details.  
本リポジトリのソースコード（プログラム・ロジック）は **Unlicense** に基づき、パブリックドメインとして公開されています。  
クレジット表記なしで、商用・非商用問わず完全に自由にご利用いただけます。

### Content & Themes / コンテンツ・デザイン・テーマ

All rights reserved for the content, including text, images, designs, and specific themes.  
See the `LICENSE-CONTENT` file for details.  
文章、画像、デザイン、および取り扱っている固有のテーマ・世界観などのコンテンツ資産に関する著作権は、すべて作者に帰属します（All Rights Reserved）。  
コードの仕組みを利用してまったく別のテーマの作品を作ることは歓迎しますが、本コンテンツの文章やテーマそのものを模倣・流用・転載することは固くお断りします。
