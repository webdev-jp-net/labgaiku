# ルーティング仕様

## 概要

Next.js App Router（`src/app`）を利用したルーティング構成。

## ルート構成（2025-10-04時点）

| ルート | 認証 | 説明 |
|--------|------|------|
| `/` | 必須 | レポート一覧（ログイン必須） |
| `/{slug}` | 必須 | レポート詳細（ログイン必須） |
| `/api/auth/*` | - | NextAuthエンドポイント |

## 認証フロー
- 未ログイン時は一覧・詳細ともに閲覧できず、ログイン案内を表示
- 認証済みであれば microCMS から取得したレポートを表示
- ログアウト時はセッション破棄後にトップへ戻る

詳細は [認証仕様](../backend/next-auth.md) を参照。

## ディレクトリ構造
- `src/app/page.tsx`: レポート一覧（サーバーコンポーネント）
- `src/app/reports/_parts/`: 一覧・詳細のビュー／フック
- `src/app/[slug]/page.tsx`: レポート詳細
- `src/app/api/auth/[...nextauth]/route.ts`: NextAuth API

## エラーハンドリング
- 存在しないスラッグは `notFound()` を返し404扱い
- 認証エラーは NextAuth 側で処理し `/api/auth/signin` へ誘導

## 関連ドキュメント
- [コンポーネント設計](./components.md)
- [microCMS連携仕様](./microcms.md)
- [認証仕様](../backend/next-auth.md)