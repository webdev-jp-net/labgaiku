# 技術構成（Tech Structure）

## フロントエンド
- Next.js 15 App Router
- React 19 + TypeScript
- SCSS Modules（グローバルスタイルは`src/styles/index.scss`）
- 認証: NextAuth.js（Google OAuth）
- データ取得: microCMS（interviewsコンテンツ）

## ディレクトリ概要
- `src/app`: App Routerページ・レイアウト
- `src/components`: 再利用可能なUI（認証コンポーネントなど）
- `src/lib`: APIクライアント、ユーティリティ
- `src/styles`: グローバルSCSS/変数
- `_llm-docs`: ドキュメント一式

## 環境変数
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_MICROCMS_SERVICE_KEY`, `NEXT_PUBLIC_MICROCMS_API_KEY`

## 補足
- 現時点ではバックエンド/DBは無し（microCMSでコンテンツ取得）
- 拡張方針は各仕様書（routing, components, microcms等）を参照
