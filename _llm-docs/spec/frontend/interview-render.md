# インタビュー記事整形仕様

## 概要

microCMSから取得したインタビュー記事は、サーバーコンポーネント（`page.tsx`）でいくつかの整形を経たうえでViewに渡る。Viewは表示処理のみを担当し、整形ロジックを持たない方針。

データ取得や`canViewInterview`等の権限判定の前提は[microCMS連携仕様](./microcms.md)を参照。

## 整形の実行場所

- 一覧:`src/app/(contents)/interview/page.tsx`
- 詳細:`src/app/(contents)/interview/[slug]/page.tsx`

タイトル・目次テキスト・公開範囲ラベルは`ReactNode`として組み立てViewに渡す。本文HTMLは`cheerio`で書き換えたうえで`sanitizeHtml`を通す。

## タイトル/見出しの`——`を`<small>`化

タイトル文字列に2倍ダッシュ`——`が含まれる場合、`——`以降をサブタイトル扱いとして`<small>`で囲う。判定は`raw.indexOf('——')`で行い、後半は`——`を含めて`<small>`に入れる。

適用箇所:

- 一覧カードのタイトル
- 詳細ページの`<h1>`
- 詳細ページ本文中の`<h2>`

入稿運用: メインタイトルとサブタイトルを`——`で区切って入力する。

## 本文HTMLの整形

詳細ページの`page.tsx`で`cheerio`を用いて`interview.content`を読み込み、以下を順に適用する。

### 話者+コロン → `<dl>`化

「日本語名+コロン（半角`:`または全角`：`）+発話」のパターンを`<dl>`に変換する。

```html
<!-- 入稿原文 -->
<p>名前:こんにちは。</p>

<!-- 変換後 -->
<dl>
  <dt>名前</dt>
  <dd>こんにちは。</dd>
</dl>
```

検出する3ケース:

1. `<p>`先頭がテキストノードで「名前+コロン+発話」を一行で含む
2. 先頭がインライン要素タグでテキストがマルチバイトのみ、直後のテキストがコロンで始まる
3. 先頭要素内に「名前+コロン」がすべて入る

入稿運用: 発話形式は「名前:発話」「名前：発話」のいずれかで書く（半角/全角どちらでも可）。

### `<h2>`の`——`を`<small>`化

本文`<h2>`にも`——`が含まれる場合、タイトルと同じく後半を`<small>`で囲う。

### `<h2>`/`<h3>`をBudouXで文節分割

`<h2>`/`<h3>`のテキストをBudouXで文節分割し、各文節を`<span>`でラップする。日本語の禁則処理（文節単位での折返し）を有効化する目的。

`WordUnit`コンポーネントが`.word`クラスを定義しているため、`page.tsx`からも同じCSS Modulesをimportし同一ハッシュを参照する。実装は`segmentToHtml(text)`ヘルパーに集約。

## 目次（IndexNavigation）

- `cheerio`で本文`<h2>`の`id`とテキストを抽出する
- microCMSのリッチエディターが見出しに自動付与する`id`をアンカーリンクのhrefに利用する
- 各テキストはタイトルと同じ`buildTitle`で整形した`ReactNode`としてViewに渡す
- アンカー着地時の上余白は本文`<h2>`の`scroll-margin-top`で確保する

## 公開範囲ラベル

一覧/詳細の日付の右隣に、`secret`または`limited`のときのみラベルを表示する。ラベル組み立ては`src/lib/permission.ts`の`getVisibilityLabel`に集約。

| visibility | 表示文字列 | aria-label         |
| ---------- | ---------- | ------------------ |
| `secret`   | `secret`   | 公開範囲: 非公開   |
| `limited`  | `limited`  | 公開範囲: 限定公開 |
| `public`   | 表示しない | -                  |

`secret`記事は権限がない閲覧者には一覧から除外されるため、ラベルが見えるのは権限保持者のみ。

## 関連ファイル

- `src/components/WordUnit/`: BudouX文節分割コンポーネント（`.word`クラスを定義）
- `src/lib/sanitize.ts`: `sanitizeHtml`（DOMPurify）
- `src/lib/permission.ts`: 権限判定と公開範囲ラベル組立
- `src/lib/date.ts`: `formatJaDate`
