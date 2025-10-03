# プロジェクト構成

## ディレクトリ構造

```
lab-ga-iku/
├── src/                           # Astroソースコード
│   ├── components/                # 再利用可能なコンポーネント
│   │   ├── Header.astro
│   │   ├── Header.module.css
│   │   ├── Footer.astro
│   │   ├── Footer.module.css
│   │   ├── ArticleCard.astro
│   │   └── ArticleCard.module.css
│   ├── layouts/                   # ページレイアウト
│   │   ├── BaseLayout.astro
│   │   └── ArticleLayout.astro
│   ├── pages/                     # ページファイル（ルーティング）
│   │   ├── index.astro            # トップページ
│   │   ├── login.astro            # ログインページ
│   │   └── articles/
│   │       ├── index.astro        # 記事一覧
│   │       └── [slug].astro       # 記事詳細
│   ├── content/                   # コンテンツコレクション
│   │   ├── config.ts              # コンテンツ設定
│   │   └── articles/              # 記事Markdown
│   │       ├── 2025-01-interview-01.md
│   │       └── 2025-02-interview-02.md
│   ├── middleware/                # ミドルウェア
│   │   └── auth.ts                # 認証チェック
│   ├── lib/                       # ライブラリ・ユーティリティ
│   │   ├── auth.ts                # Auth.js設定
│   │   └── utils.ts               # 汎用関数
│   └── styles/                    # グローバルスタイル
│       ├── global.css             # グローバルCSS
│       └── variables.css          # CSS変数
├── public/                        # 静的アセット
│   ├── images/                    # 画像ファイル
│   └── favicon.ico
├── _llm-rules/                    # AI開発者向けルール
├── _llm-docs/                     # プロジェクト仕様書
├── _llm-memories/                 # 開発履歴・Issue管理
├── .kiro/                         # Kiro IDE設定
│   └── steering/                  # ステアリングルール
└── tools/                         # 開発ツール・スクリプト
```

## 主要ファイル

### 設定ファイル
- `astro.config.mjs`: Astro設定（SSRモード有効化）
- `auth.config.ts`: Auth.js設定
- `tsconfig.json`: TypeScript設定
- `package.json`: 依存関係・スクリプト
- `.env.local`: 環境変数（Git管理外）
- `.gitignore`: Git除外設定

### 開発ガイド
- `AGENT.md`: AI開発者向けガイド
- `README.md`: プロジェクト概要

## コンポーネント構成

### レイアウト
- `BaseLayout.astro`: 基本レイアウト（ヘッダー・フッター含む）
- `ArticleLayout.astro`: 記事詳細用レイアウト

### コンポーネント
- `Header.astro` + `Header.module.css`: ヘッダーナビゲーション
- `Footer.astro` + `Footer.module.css`: フッター
- `ArticleCard.astro` + `ArticleCard.module.css`: 記事カード
- `AuthButton.astro` + `AuthButton.module.css`: 認証ボタン

### ページ
- `index.astro`: トップページ（認証後リダイレクト）
- `login.astro`: ログインページ（SSOプロバイダー選択）
- `articles/index.astro`: 記事一覧（認証必須）
- `articles/[slug].astro`: 記事詳細（認証必須）

## 命名規約

### ファイル・ディレクトリ
- **Astroコンポーネント**: PascalCase（例: `ArticleCard.astro`）
- **CSS Modules**: PascalCase + `.module.css`（例: `ArticleCard.module.css`）
- **ページファイル**: kebab-case（例: `article-list.astro`）
- **ユーティリティ**: camelCase（例: `formatDate.ts`）
- **記事ファイル**: `YYYY-MM-slug.md`（例: `2025-01-interview-01.md`）

### CSS・スタイル
- **クラス名**: セマンティックな短い命名（例: `.header`, `.nav`, `.article`）
- **CSS変数**: kebab-case（例: `--primary-color`, `--spacing-md`）
- **BEM不使用**: 冗長な命名規則は排除

### TypeScript
- **変数・関数**: camelCase（例: `articleList`, `getArticles`）
- **型・インターフェース**: PascalCase（例: `Article`, `AuthUser`）
- **定数**: UPPER_SNAKE_CASE（例: `MAX_ARTICLES`）

## CSS Modules 使用例

```astro
---
// ArticleCard.astro
import styles from './ArticleCard.module.css';
---

<article class={styles.article}>
  <h2 class={styles.title}>{title}</h2>
  <p class={styles.content}>{excerpt}</p>
</article>
```

```css
/* ArticleCard.module.css */
.article {
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
}

.title {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}

.content {
  color: var(--text-secondary);
}
```

## 開発フロー

### ブランチ戦略
- `main`: 本番環境（Vercel自動デプロイ）
- `develop`: 開発環境
- `feature/*`: 機能開発ブランチ

### コミット規約
- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメント
- `style:` スタイル変更
- `refactor:` リファクタリング
- `content:` 記事追加・更新

### 記事追加フロー
1. `src/content/articles/YYYY-MM-slug.md` を作成
2. Frontmatterでメタデータ設定
3. 記事本文をMarkdownで記述
4. Gitコミット・プッシュ
5. Vercelが自動ビルド・デプロイ