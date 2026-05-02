# 技術構成

## 確定技術スタック

### フロントエンド
- **Astro**: 静的サイトジェネレーター（SSRモード使用）
- **TypeScript**: 型安全な開発
- **SCSS Modules**: コンポーネント単位のスタイル管理

### 認証
- **Auth.js**: 軽量な認証ライブラリ（@auth/core使用）
- **SSOプロバイダー**: Google / GitHub

### 記事管理
- **Markdown**: 記事コンテンツ
- **Frontmatter**: メタデータ管理
- **Git**: バージョン管理

### ホスティング・デプロイ
- **Vercel**: ホスティングプラットフォーム
- **自動デプロイ**: Gitプッシュで自動デプロイ

### 開発・ビルドツール
- **pnpm**: パッケージマネージャー
- **ESLint**: コード品質管理
- **Prettier**: コードフォーマット

## 開発コマンド

```bash
# 開発
pnpm dev                    # 開発サーバー起動
pnpm build                  # ビルド
pnpm preview                # ビルド結果のプレビュー

# 品質管理
pnpm lint                   # リント実行
pnpm lint:fix               # リント自動修正
pnpm format                 # コード整形

# テスト（導入予定）
pnpm test                   # テスト実行
pnpm test:watch             # テスト監視
```

## スタイリング方針

### SCSS Modules
- **セマンティックな命名**: 短く意味のあるクラス名
- **BEM不使用**: 冗長な命名規則は排除
- **コンポーネント単位**: 適切に分離されたスタイル

### 命名例
```css
/* ✅ 推奨: セマンティックな短い命名 */
.header { }
.nav { }
.article { }
.title { }
.content { }

/* ❌ 非推奨: BEM的な冗長な命名 */
.header__nav { }
.article__title--large { }
```

## 認証フロー

### Auth.js 実装
1. **ログインページ**: SSOプロバイダー選択
2. **認証処理**: Auth.jsがOAuth処理を実行
3. **セッション管理**: Cookie/JWTでセッション保持
4. **保護されたページ**: 認証チェックミドルウェア

### 対応プロバイダー
- Google OAuth
- GitHub OAuth

## 記事管理フロー

### 記事追加プロセス
1. Markdownファイル作成（`src/content/articles/`）
2. Frontmatterでメタデータ設定
3. Gitコミット・プッシュ
4. Vercelが自動デプロイ

### Frontmatter例
```yaml
---
title: "インタビュー記事タイトル"
date: 2025-01-15
author: "Labが行く"
tags: ["インタビュー", "技術"]
---
```

## 開発方針

- **ミニマル設計**: 必要最小限の依存関係
- **TypeScript strict**: 型安全性の確保
- **セマンティックHTML**: 意味のあるマークアップ
- **軽量**: JavaScriptを最小限に抑える
- **Git中心**: 記事管理はGitベース