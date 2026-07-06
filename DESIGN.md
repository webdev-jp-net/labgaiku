# Labが行く—DESIGN

本ドキュメントは、`labgaiku`で実装しているウェブサイトのデザインを、**現在の実装状態を正答**として記述したもの。トークン値・挙動はすべて`src/styles`および各`*.module.scss`の実装から抽出している。実装と本ドキュメントが食い違う場合は実装を正とし、本ドキュメントを更新する。

> 初期のデザイン定義は[\_llm-docs/spec/design-system.md](./_llm-docs/spec/design-system.md)を参照。本ドキュメントは実装から逆引きした現状の記録であり、初期定義とは一部乖離がある。

---

## 基本思想

- **文字が主役。**UIは本文の読書体験を支える脇役に徹し、装飾は余白・罫線・タイポグラフィで構築する
- **紙色ベースの単色調。**純白・純黒を避けた紙とインクの配色。差し色（くすみ系ティール）はマーカー帯の生成にのみ使う
- **罫線は1pxの低コントラスト実線のみ。**カード化はせず、リストは罫線区切り+余白で表現する
- **ホバー演出は「手描きマーカー」がモチーフ。**リンクやタイトルは斜めの蛍光帯がスッと伸びる演出で統一する
- **ダークモードは`prefers-color-scheme`で自動切替。**専用トグルは持たない

---

## カラー

`src/styles/index.scss`の`:root`でCSS Variablesとして定義。ダークモードは`@media (prefers-color-scheme: dark)`で上書きする。

### 基本色

| トークン        | ライト    | ダーク    | 用途                             |
| --------------- | --------- | --------- | -------------------------------- |
| `--bg-basic`    | `#fafaf7` | `#12120f` | ページ背景。紙色／インク色       |
| `--bg-accent`   | `#90d5cc` | `#427e8a` | くすみ系ティール。派生色の生成元 |
| `--txt-accent`  | `#1a1a1a` | `#e8e8df` | 見出し・強調                     |
| `--txt-basic`   | `#4a4845` | `#c1c0b8` | 本文                             |
| `--txt-muted`   | `#85827a` | `#77756e` | 補足説明（`txt-description`）    |
| `--txt-subtle`  | `#b8b5ac` | `#4a4845` | カナ表記・補助情報、罫線の生成元 |
| `--txt-on-fill` | `#fafaf7` | `#12120f` | 反転背景上の文字色               |

### 派生色（`color-mix`で生成）

| トークン          | 生成式                    | 用途                                        |
| ----------------- | ------------------------- | ------------------------------------------- |
| `--bg-panel`      | `--txt-subtle`の5%不透明  | フッター背景、GlobalNavigationのベース      |
| `--bg-marker`     | `--bg-accent`の25%不透明  | `txt-accent`mixinの蛍光帯、ホバー時の文字色 |
| `--bg-light`      | `--bg-basic`の20%不透明   | `btn-glass`の背景                           |
| `--border-basic`  | `--txt-subtle`の50%不透明 | 1px罫線全般                                 |
| `--border-marker` | `--bg-accent`の50%不透明  | マーカー系の罫線                            |

---

## タイポグラフィ

### 書体

`src/app/layout.tsx`で`next/font`により読み込み、CSS変数で参照する。

- **LINE Seed JP**（`--font-line-seed-jp`、ローカルwoff2）：本文・見出しの基本書体。ウェイトは**Thin（100）とRegular（400）の2種のみ**。Boldは使わない
- **Plaster**（`--font-plaster`、Google Fonts、400）：`txt-kana`mixin専用の装飾書体。セクション名のローマ字カナ表記（例：Home heroや各ページヘッダーの英字）に使う
- フォールバック：`Hiragino Kaku Gothic ProN`→システムサンセリフ

`body`には`font-feature-settings: 'palt' 1`と`font-kerning: normal`を適用し、和欧混植の密度を整える。

### ルートフォントサイズ（リキッドレイアウト）

`html`の`font-size`は幅375pxのアートボードで16px相当となるリキッド値（`16/375 × 100vw`）。**画面幅が422pxを超えると18px固定**に切り替わり、以降は`rem`基準のセンタリングレイアウトになる。`rem()`関数（`src/styles/_variable/function/_rem.scss`）は`px ÷ 16 × 1rem`の変換を行う。

### テキストスタイル（mixin）

`src/styles/_variable/template/_text.scss`に集約。すべて`text-box: trim-both cap alphabetic`で上下の仮想ボディ余白をトリムする。

| mixin             | サイズ                             | ウェイト                      | 行間                   | 字間   | 用途                               |
| ----------------- | ---------------------------------- | ----------------------------- | ---------------------- | ------ | ---------------------------------- |
| `hd-display`      | narrow`rem(56)`／fromWide`rem(80)` | Thin                          | 1.3                    | 0.03em | Homeのサイト名                     |
| `hd-lg`           | narrow`rem(42)`／fromWide`rem(48)` | Thin                          | 1.3                    | 0.02em | 一覧・ZINEのページタイトル         |
| `hd-md`           | `rem(32)`                          | narrow Regular／fromWide Thin | 1.4                    | 0.02em | 記事タイトル・本文`<h2>`           |
| `hd-sm`           | `rem(24)`                          | Regular                       | 1.5                    | 0.03em | 本文`<h3>`、`hd-md`内`<small>`     |
| `txt-lead`        | `rem(18)`                          | —                             | 1                      | 0.05em | ゲスト名・サイト名（ナビ）         |
| `txt-paragraph`   | `rem(16)`                          | Regular                       | narrow 2／fromWide 2.5 | 0.04em | 本文段落（`text-align: justify`）  |
| `txt-description` | `rem(14)`                          | —                             | —                      | 0.03em | 日付などの補足（`--txt-muted`）    |
| `txt-kana`        | 呼び出し側で指定                   | —（Plaster）                  | —                      | —      | ローマ字カナ表記（`--txt-subtle`） |

- **画面幅でウェイトを切り替える見出し**：`hd-md`（とその`<small>`）はnarrowでRegular、fromWideでThinに切り替え、広い画面では余白に溶ける質感へ寄せる
- タイトル・見出し中の`——`以降はサブタイトルとして`<small>`（`hd-sm`＋Thin＋上マージン`rem(12)`）で従属表示する
- `<h2>`／`<h3>`はBudouXで文節分割し`<span>`（`display: inline-block`）でラップして禁則処理する（`WordUnit`コンポーネント）

---

## 装飾表現

### リンク（`txt-link`）

テキストリンクの標準スタイル。`a:not([class])`にも適用される。

- 下線は`underline dotted 1px`＋`text-underline-offset: 0.2em`（`$underline: false`で無効化可）
- 文字色は透明にし`text-shadow: 0 0 0 var(--txt-basic)`で描画する（ホバー時ににじみ表現へ移行するための下地）
- 背景に斜め（`-0.2turn`）の`repeating-linear-gradient`で「手描きマーカー帯」を右下に敷き、ホバーで帯が左から全幅（`100% 0.8em`）に伸びると同時に文字色が`--bg-marker`＋`text-shadow`1pxのにじみに変わる
- `@media (any-hover: hover)`ガード必須

同系の演出は`InterviewItem`のタイトル、`AppFooter`・`ContentsMenu`のサイト名にも展開されている（帯の初期幅50%〜、ホバーで全幅）。

### マーカー帯

- `txt-marker`：`--txt-subtle`系の帯。MemberListのタグ表示に使用
- `txt-accent`：`--bg-marker`（ティール）の帯。Home・ZINE本文の`highlight`（強調語）に使用

### ぼかし演出

補助テキスト（`ContentsMenu`のカナ、`AppFooter`のドメイン表記）はホバー時に`filter: blur(1px)`で「にじむ」演出を行う。

### ボタン

- **`btn-glass`**（`src/styles/_variable/template/_button.scss`）：唯一のボタンテンプレート。`rem(40)`角のアイコンボタンで、`--bg-light`背景＋`--radius-sm`。ホバーで`--bg-basic`に変わりinsetの`box-shadow`ですりガラスの起伏を出す。GlobalNavigationの目次トリガー・ページ先頭スクロールに使用
- テキスト系の操作（ログイン/ログアウト等）はボタン化せず`txt-link`のリンク表現で提供する

### 角丸・シャドウ

- 角丸トークンは`--radius-sm: rem(4)`のみ。適用は`btn-glass`に限る
- `box-shadow`は`btn-glass`のホバー起伏のみ、`text-shadow`はリンクのにじみ表現のみ。面を浮かせるドロップシャドウは使わない

---

## モーション

| トークン             | 値               | 用途                            |
| -------------------- | ---------------- | ------------------------------- |
| `--transition`       | `150ms ease-out` | 即応する変化（text-shadow・色） |
| `--transition-enter` | `1000ms ease-in` | ホバー解除後にゆっくり戻る変化  |
| `--transition-leave` | `250ms ease-out` | ホバー時にスッと現れる変化      |

- **非対称トランジションが基本。**通常状態には`enter`（1000ms）でゆっくり戻り、ホバー反応は`leave`（250ms）や`--transition`（150ms）で素早く現れる
- 対象は不透明度・色・背景サイズ・`scale`などの軽量プロパティに限定。バウンスやパララックスは使わない
- ページ内スクロールは`html { scroll-behavior: smooth }`（`data-location-change`属性で一時無効化できる）

---

## スペーシング

4を最少とする8の倍数グリッド。`rem()`変換でトークン化している。

| トークン        | px  | 主な用途                           |
| --------------- | --- | ---------------------------------- |
| `--spacing-xs`  | 4   | インライン間隔                     |
| `--spacing-sm`  | 8   | ボタンパディング・小間隔           |
| `--spacing-md`  | 24  | narrowの左右パディング・ブロック内 |
| `--spacing-lg`  | 32  | ヘッダー内gap                      |
| `--spacing-xl`  | 40  | 一覧アイテムの上下（narrow）       |
| `--spacing-2xl` | 48  | 一覧アイテムの上下（fromWide）     |
| `--spacing-3xl` | 64  | セクション余白・2カラムのガター    |
| `--spacing-4xl` | 96  | 本文ブロック上余白                 |
| `--spacing-5xl` | 128 | 本文`<h2>`上余白・詳細下余白       |
| `--spacing-6xl` | 160 | ページ下余白（narrow）             |
| `--spacing-7xl` | 200 | ページ下余白（fromWide）           |

`md`は16を飛ばして24に置き、本文の段落間とブロック間の差を確保する。本文中の段落間は`em`基準（narrow`3em`／fromWide`4em`）で組む。

---

## ブレークポイント

`src/styles/_variable/mixin/_mq.scss`の`mq()`で管理。境界値は`narrow: 480px`／`middle: 1280px`／`wide: 1440px`／`maximum: 1680px`。

| プリセット   | 範囲         | 想定デバイス     |
| ------------ | ------------ | ---------------- |
| `narrow`     | 〜479px      | スマートフォン   |
| `fromWide`   | 480px〜      | タブレット以上   |
| `middle`     | 480〜1279px  | タブレット       |
| `wide`       | 1281〜1440px | ラップトップ     |
| `fromLaptop` | 1440px〜     | ラップトップ以上 |
| `maximum`    | 1441px〜     | デスクトップ     |

実装で主に使うのは**narrow／fromWide／fromLaptop**の3段。コンテナクエリ用に`cq()`mixinも用意している。

---

## レイアウト

### コンテナ（`tmp-container`）

- narrow：幅100%＋左右`--spacing-md`（24px）パディング
- fromWide：`max-width: rem(600)`＋左右`--spacing-xl`パディングで中央寄せ

### 2カラムグリッド

fromLaptop（1440px〜）で全ページ共通の2カラム構成に切り替える。

```
grid-template-columns: rem(502) 1fr;  /* rem(630 - 64 - 64) */
max-width: rem(1280);
margin-inline: auto;
```

- 左カラム：ページヘッダー（タイトル・カナ表記・説明、詳細ページではゲスト・MemberList・IndexNavigationも）。内側の`.sticky`ラッパーが`position: sticky; top: 0`で画面に追従する
- 右カラム：本文・リスト
- narrowでは1カラムに戻り、stickyは解除される

### `position`の使い分け

- `fixed`は使わない
- `sticky`は「読書補助」用途に限定：各ページ左カラムのヘッダー追従と、GlobalNavigation（画面下部）の2箇所

---

## ナビゲーション

### GlobalNavigation（画面下部）

- `position: sticky`で下端に貼り付く横断ナビ。`--bg-panel`＋グラデーション＋`backdrop-filter: blur(1rem)`のすりガラス表現
- `<html>`の`data-visible-nav`属性の有無で表示を切り替える（`ContentsMenu`が画面内に見えている間は非表示）。消える際は`opacity`＋`scale: 1 0.8`（transform-origin: bottom）で下に沈む
- 内容物：サイト名（`txt-lead`）／記事詳細でのみ出る補助リンク／目次popoverトリガー／ページ先頭スクロールボタン（いずれも`btn-glass`）
- 目次popoverはHTML Popover API＋CSS Anchor Positioningで配置（narrowは中央上`position-area: top`、fromWideは右端揃え`top span-left`）。パネルはナビ本体と同じすりガラス表現

### ContentsMenu

コンテンツへの遷移リンク。各項目は`rem(12)`の短い水平線（`--txt-subtle`）を先頭に置き、タイトル（マーカーホバー）＋カナ表記（Plaster・ホバーでblur）の2段組み。

### AppFooter

`--bg-panel`背景。グリッドで「サイト情報／ContentsMenu／ログイン操作／コピーライト」を配置。サイト名にマーカーホバー、ドメイン表記にblurホバーを適用。

---

## アイコン・画像

- **Lucide Icons**（`lucide-react`）を`strokeWidth={1.5}`で統一。使用箇所は目次（`List`／`X`）・ページ先頭（`ArrowUp`）など最小限
- **Unicode記号を積極活用**：区切りの`・`、Homeカナ表記の`ー→`、水平線代わりの1px線など
- 絵文字は使わない
- 写真・画像は原則持たない。例外はZINEページの誌面画像（`<figure>`＋右寄せ`txt-description`キャプション）と、一覧ページHostMemberListの似顔絵（`rem(42)`×`rem(56)`の切り抜き）

---

## 組版パターン

### ヒーロー（Home）

- `hd-display`のサイト名＋Plasterのカナ表記＋`ー→`記号で構成。上端から30svhを起点に置き、fromWideではstickyで画面に残る

### ページヘッダー（一覧・詳細・ZINE共通）

- `hd-lg`（詳細は`hd-md`）のタイトル＋`txt-kana`のカナ表記＋`txt-description`の説明文を縦積み
- 2カラム時は左カラムに置き、`.sticky`ラッパーで画面に追従する

### 記事本文（`.wysiwyg`）の組版

- 段落間：narrow`3em`／fromWide`4em`
- `<h2>`：`hd-md`、上余白`--spacing-5xl`、アンカー着地用に`scroll-margin-top`を確保
- `<h3>`：`hd-sm`、上余白は`--spacing-2xl`〜`--spacing-4xl`
- 話者の発話は`<dl>`（`auto 1fr`の2カラムグリッド）。`<dt>`の後に`：`を自動付与
- `<blockquote>`：左に`rem(2)`の`--border-basic`罫線
- `<hr>`：1pxの`--border-basic`罫線

### 一覧アイテム（InterviewItem）

- リンク全体がホバー領域。タイトルはマーカー帯（初期50%幅）が全幅に伸びる
- メタ行は日付（`txt-description`）＋`・`区切りの公開範囲ラベル（`txt-kana`）
