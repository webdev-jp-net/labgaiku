# 技術構成（Tech Structure）

## フロントエンド

- Next.js 16 App Router
- React 19 + TypeScript
- SCSS Modules（グローバルスタイルは`src/styles/index.scss`）
- 認証: NextAuth.js v4（Google OAuth）
- データ取得: microCMS（`interview`コンテンツ）

## 主要ライブラリ

- `microcms-js-sdk`: microCMSクライアント
- `isomorphic-dompurify`:本文HTMLのサニタイズ
- `cheerio`:本文HTMLから見出しを抽出して目次を生成
- `dayjs`:開催日の`YYYY年M月D日`整形

## ディレクトリ概要

- `src/app`: App Routerページ・レイアウト
- `src/components`:共通レイアウトコンポーネント（`layout/`）
- `src/lib`: APIクライアント・権限判定・サニタイズ・日付整形
- `src/styles`:グローバルSCSS/変数
- `_llm-docs`:ドキュメント一式

## 環境変数

- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY`（サーバー専用、`NEXT_PUBLIC_`プレフィックスを付けない）

## 補足

- バックエンド／DBは持たず、コンテンツ取得はmicroCMSのみ
- 拡張方針は各仕様書（routing, components, microcms等）を参照
