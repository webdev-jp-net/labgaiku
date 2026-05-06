# microCMS連携仕様

## 概要

ラボインタビュー記事（`interview`コンテンツ）をmicroCMSから取得し、Next.js App Routerのサーバーコンポーネント経由で描画するための基本的な方針を定義する。

## 環境変数

`.env.local`に以下を定義する。

- `MICROCMS_SERVICE_DOMAIN`: サービスドメイン（例:`labgaiku`）
- `MICROCMS_API_KEY`: APIキー（サーバー側のみで使用）

## コンテンツモデル（interview）

| フィールドID | 表示名         | 型           | 必須 | 備考                                                                                                                                   |
| ------------ | -------------- | ------------ | :--: | -------------------------------------------------------------------------------------------------------------------------------------- |
| `visibility` | 公開範囲       | select       |  ○   | 初期値`secret`。選択肢:`secret`,`limited`,`public`                                                                                     |
| `guest`      | ゲスト         | text         |  ○   | 一意制約あり                                                                                                                           |
| `date`       | 開催日         | date         |  ー  | 日付形式で保存                                                                                                                         |
| `title`      | タイトル       | text         |  ー  |                                                                                                                                        |
| `content`    | 本文           | richEditorV2 |  ー  | 見出し/段落/装飾/表などが利用可能                                                                                                      |
| `allowList`  | 閲覧許可リスト | textArea     |  ー  | `limited`時の閲覧許可リスト。1行1値・改行区切り。`@`を含む行はメールアドレス、含まない行はドメインとして判定。前後空白と大小文字は無視 |

### `visibility`各値の挙動

- `secret`: 制作途中の下書き。`allowList`に該当するログインユーザのみ一覧で通常表示+リンク有効・詳細閲覧可。それ以外（未認証/非該当の認証ユーザ）は一覧から完全除外。詳細URL直アクセス時はログイン促しViewを表示するが、タイトルと日付も伏せ字（`＊＊＊＊＊`）にしてメタ情報も隠し、公開範囲ラベルのみ`secret`として残す
- `limited`: 限定公開。一覧ではタイトル・日付・公開範囲ラベルを通常表示しつつ、ゲストのみ伏せ字（`＊＊＊＊＊`）にして非リンク化する。`allowList`に該当するログインユーザのみゲストの伏せ字解除+リンク有効、詳細閲覧可。非該当ユーザの詳細URL直アクセス時はログイン促しViewにタイトル・日付・公開範囲ラベルを引き継いだうえで表示
- `public`: 全公開。一覧で通常表示+リンク有効、詳細は誰でも閲覧可（認証不要）

判定ロジックは`src/lib/permission.ts`の`canViewInterview(interview, session)`に集約。伏せ字定数は同ファイルの`MASK_PLACEHOLDER`。

### `allowList`の判定ルール

各行をトリム+小文字化し、空行を除外したうえで:

- `@`を含む行 → メールアドレスとして完全一致判定（ログインユーザのメールと比較）
- `@`を含まない行 → ドメインとして一致判定（ログインユーザのメールの`@`以降と比較）

## 実装ディレクトリ構成

- `src/lib/api/microcms.ts`
  - microCMSクライアントの生成
  - `interview`用TypeScript型の定義（フィールド一覧に準じる）
  - 一覧取得（`getInterviewList`）と詳細取得（`getInterviewById`）のラッパー関数
- `src/app/(contents)/interview/page.tsx`/`src/app/(contents)/interview/[slug]/page.tsx`
  - サーバーコンポーネントで取得関数を呼び出し、データを`_parts`の表示コンポーネントへ渡す
- `src/app/(contents)/interview/_parts/`/`src/app/(contents)/interview/[slug]/_parts/`
  - サーバーコンポーネントから受け取ったデータをViewで描画する。一覧側は表示形整形のフック（`useInterviewIndex`）を経由する。詳細側は整形を`page.tsx`に集約しフックを置かない
  - 繰り返しUIは`components/`配下のparts-componentに切り出す

## 取得処理の方針

- App Routerのサーバーコンポーネントで`getInterviewList`/`getInterviewById`を呼び出す
- 一覧取得時は`orders: '-date'`を渡し、開催日が新しい順に並んだ状態で取得する
- 取得結果は`page.tsx`で表示用の派生値を組み立てたうえで`_parts`のViewへ渡す
- 公開範囲や詳細表示などの応用が必要になった場合は、追加の取得関数やAPI Routeを`src/lib/api/microcms.ts`/`src/app/api/...`に追加する

## HTML表示とサニタイズ

- `interview.content`は`richEditorV2`形式でHTML文字列が返る
- サニタイズ処理は`src/lib/sanitize.ts`の`sanitizeHtml`に集約し、詳細ページの`page.tsx`で整形済みHTMLに対して適用してからViewに渡す（`view.tsx`から`sanitizeHtml`を直接呼ばない）
- 描画は`dangerouslySetInnerHTML`を経由する
- 本文HTMLに対する話者+コロン→`<dl>`化、見出しの`<small>`化、BudouX分節などの整形仕様は[インタビュー記事整形仕様](./interview-render.md)を参照

## 目次（IndexNavigation）の生成

- 詳細ページのサーバーコンポーネントで`cheerio`を用いて`interview.content`から`<h2>`の`id`とテキストを抽出し、配列としてViewに渡す
- microCMSのリッチエディターが見出しに自動付与する`id`を利用してページ内アンカーリンクを構成する
- テキストの整形（タイトルと同じ`<small>`化やBudouX分節）は[インタビュー記事整形仕様](./interview-render.md)を参照

## 開催日の整形

- `interview.date`の表示は`src/lib/date.ts`の`formatJaDate`を経由し、`YYYY年M月D日`形式に整形する
- 整形には`dayjs`を使用

## 今後の拡張メモ

- microCMSへの投稿・更新が必要になった際のServer Action/API化
