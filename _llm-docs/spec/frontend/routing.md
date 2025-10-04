# ルーティング仕様

## 概要

Next.js App Router（`src/app`）を利用したルーティング構成。

## ルート構成（2025-10-04 時点）

| ルート           | 認証 | 説明                             |
|------------------|------|----------------------------------|
| `/`              | 任意 | Home。ログイン状態でメニュー出し分け |
| `/app`           | 必須 | 認証済み向けレポート一覧         |
| `/api/auth/*`    | -    | NextAuth エンドポイント          |

※ 今後 `report/[id]` など詳細ページを追加予定。

## 認証フロー
- 未ログインで `/app` にアクセス → `redirect("/api/auth/signin?callbackUrl=%2Fapp")`
- ログイン後は `/app` へ遷移
- ログアウト時はセッション破棄後にトップへ戻る

詳細は [認証仕様](../auth/next-auth.md) を参照。

## ディレクトリ構造
- `src/app/page.tsx`: ホーム（サーバーコンポーネント）
- `src/app/_parts/`: HomeView/useHome等
- `src/app/(authenticated)/app/page.tsx`: 認証保護されたレポート一覧
- `src/app/api/auth/[...nextauth]/route.ts`: NextAuth API

## エラーハンドリング
- 存在しないルートにはデフォルトの404ページ（未実装）。
- 認証エラーはNextAuth側で処理し`/api/auth/signin`へ誘導。

## 関連ドキュメント
- [コンポーネント設計](./components.md)
- [microCMS 連携仕様](./microcms.md)
- [認証仕様](../auth/next-auth.md)