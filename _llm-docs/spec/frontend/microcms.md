# microCMS連携仕様

## 概要

ラボレポート記事（`report`コンテンツ）をmicroCMSから取得し、Next.js App Routerのサーバーコンポーネント経由で描画するための基本的な方針を定義する。

## 環境変数

`.env.local`に以下を定義する。

- `MICROCMS_SERVICE_DOMAIN`: サービスドメイン（例: `labgaiku`）
- `MICROCMS_API_KEY`: APIキー（サーバー側のみで使用）

## コンテンツモデル（report）

| フィールドID | 表示名   | 型           | 必須  | 備考                                                   |
| ------------ | -------- | ------------ | :---: | ------------------------------------------------------ |
| `visibility` | 公開範囲 | select       |   ○   | 初期値 `secret`。選択肢: `secret`, `limited`, `public` |
| `guest`      | ゲスト   | text         |   ○   | 一意制約あり                                           |
| `date`       | 開催日   | date         |  ー   | 日付形式で保存                                         |
| `title`      | タイトル | text         |  ー   |                                                        |
| `content`    | 本文     | richEditorV2 |  ー   | 見出し/段落/装飾/表などが利用可能                      |

## 実装ディレクトリ構成

- `src/lib/api/microcms.ts`
  - microCMSクライアントの生成
  - `report`用TypeScript型の定義（フィールド一覧に準じる）
  - 一覧取得や詳細取得などのラッパー関数
- `src/app/(authenticated)/app/`
  - サーバーコンポーネントで`getReports`などを呼び出し、データを`_parts`の表示コンポーネントへ渡す
- `src/app/(authenticated)/app/_parts/`
  - クライアントコンポーネント側で描画とユーザー操作を担当

## 取得処理の方針

1. App Routerのサーバーコンポーネント（例: `app/page.tsx`や`(authenticated)/app/page.tsx`）で`getReports()`を呼び出す。
2. 取得結果を`_parts/view.tsx`に渡し、一覧表示やフィルタリングを実装する。
3. 公開範囲や詳細表示などの応用が必要になった場合は、追加の取得関数やAPI Routeを`src/lib/api/microcms.ts`/`src/app/api/...`に追加する。

## HTML表示とサニタイズ

- `report.content`は`richEditorV2`形式でHTML文字列が返る。
- クライアント側でHTMLを描画する場合は`isomorphic-dompurify`を利用し、`sanitizeHtml(report.content ?? "")`のようにサニタイズしてから`dangerouslySetInnerHTML`に渡す。
- サニタイズ処理は`src/lib/sanitize.ts`で定義し、クライアント用ビュー（例: `src/app/[slug]/_parts/view.tsx`）から利用する。

## 今後の拡張メモ

- 公開範囲（`visibility`）による権限制御
- レポート詳細ページ（`/app/report/[id]`など）の追加
- microCMSへの投稿・更新が必要になった際のServer Action/API化

