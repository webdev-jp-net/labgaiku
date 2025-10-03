# プロジェクト構成

## ディレクトリ構造

```
lab-ga-iku/
├── src/                    # Astroソースコード
│   ├── components/         # 再利用可能なコンポーネント
│   ├── layouts/           # ページレイアウト
│   ├── pages/             # ページファイル（ルーティング）
│   ├── styles/            # スタイルファイル
│   └── utils/             # ユーティリティ関数
├── public/                # 静的アセット
│   ├── images/            # 画像ファイル
│   └── icons/             # アイコンファイル
├── _llm-rules/            # AI開発者向けルール
├── _llm-docs/             # プロジェクト仕様書
├── _llm-memories/         # 開発履歴・Issue管理
├── .kiro/                 # Kiro IDE設定
│   └── steering/          # ステアリングルール
└── tools/                 # 開発ツール・スクリプト
```

## 主要ファイル

### 設定ファイル
- `astro.config.mjs`: Astro設定
- `tsconfig.json`: TypeScript設定
- `package.json`: 依存関係・スクリプト
- `.gitignore`: Git除外設定

### 開発ガイド
- `AGENT.md`: AI開発者向けガイド
- `README.md`: プロジェクト概要

## コンポーネント構成

### レイアウト
- `BaseLayout.astro`: 基本レイアウト
- `BlogLayout.astro`: ブログ記事用レイアウト

### コンポーネント
- `Header.astro`: ヘッダーナビゲーション
- `Footer.astro`: フッター
- `ArticleCard.astro`: 記事カード
- `AuthButton.astro`: 認証ボタン

### ページ
- `index.astro`: トップページ
- `articles/index.astro`: 記事一覧
- `articles/[slug].astro`: 記事詳細
- `login.astro`: ログインページ

## 命名規約

### ファイル・ディレクトリ
- **Astroコンポーネント**: PascalCase（例: `ArticleCard.astro`）
- **ページファイル**: kebab-case（例: `article-list.astro`）
- **ユーティリティ**: camelCase（例: `formatDate.ts`）

### CSS・スタイル
- **クラス名**: kebab-case（例: `article-card`）
- **CSS変数**: kebab-case（例: `--primary-color`）

## 開発フロー

### ブランチ戦略
- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 機能開発ブランチ

### コミット規約
- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメント
- `style:` スタイル変更
- `refactor:` リファクタリング