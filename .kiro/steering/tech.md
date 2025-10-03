# 技術構成

## 技術スタック

### フロントエンド
- **Astro**: 静的サイトジェネレーター、メインフレームワーク
- **TypeScript**: 型安全な開発
- **CSS/Styling**: 詳細は要検討

### 認証
- **SSO**: シングルサインオン（プロバイダー要検討）

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

## 検討事項

### 認証システム
- **SSOプロバイダー**: Auth0、Firebase Auth、AWS Cognito等
- **認証フロー**: 詳細設計が必要

### データ管理
- **記事データ**: Markdown、CMS、データベース等の選択
- **画像・メディア**: 保存・配信方法

### デプロイ・ホスティング
- **静的ホスティング**: Vercel、Netlify、Cloudflare Pages等
- **CDN**: 画像・アセット配信

### スタイリング
- **CSSフレームワーク**: Tailwind CSS、UnoCSS等
- **コンポーネントライブラリ**: 必要に応じて検討

## 開発方針

- **静的生成優先**: Astroの特性を活かした高速なサイト
- **TypeScript strict**: 型安全性の確保
- **レスポンシブデザイン**: モバイルファースト
- **SEO最適化**: 記事の検索性向上