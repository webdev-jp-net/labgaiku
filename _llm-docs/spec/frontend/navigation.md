# ナビゲーション仕様

## 概要

サイト全体で利用するナビゲーション群（`GlobalNavigation`/`AppFooter`/`ContentsMenu`）の役割と挙動、およびフッター系の可視状況に応じて`GlobalNavigation`を退避させる`data-visible-nav`属性の制御方針を定義する。

## 構成要素

- `src/components/layout/GlobalNavigation/`: 画面下部に固定表示するナビ。サイト名、補助リンク、目次popover、ページ先頭へのスクロールボタンを含む
- `src/components/layout/AppFooter/`: フッター。サイト情報、`ContentsMenu`、ログイン/ログアウト操作（`signIn`/`signOut`）を含む
- `src/components/ContentsMenu/`: コンテンツ群（現在は`/interview`）への遷移リンク。`AppFooter`、Home（`src/app/_parts/view.tsx`）、`GlobalNavigation`の目次popover内から共通利用

## `data-visible-nav`属性によるナビ可視制御

### 仕様

- `<html>`の`data-visible-nav`属性の有無で`GlobalNavigation`の可視を切り替える
  - 属性あり: `GlobalNavigation`を表示
  - 属性なし: `GlobalNavigation`を非表示
- 切替は`GlobalNavigation.module.scss`内で`html:not([data-visible-nav]) &`セレクターを介し`opacity`/`pointer-events`で行う

### 観測対象と判定条件

`ContentsMenu`を観測対象とし、`useContentsMenu`（`src/components/ContentsMenu/useContentsMenu.ts`）が`useIntersectionObserver`で各インスタンスの可視状態を共有Mapへ記録する。集約結果は次のとおり:

- いずれか1つでも可視 → 属性を削除（ナビ非表示）
- どれも可視でない → 属性を付与（ナビ表示）

ページ単位での挙動例:

- Home: heroとAppFooter内に2つの`ContentsMenu`が存在。heroのほうがstickyで常時可視のため、PCではナビは常時非表示。SPはheroが見切れる区間でのみナビが表示される
- 記事一覧/詳細: `AppFooter`内の`ContentsMenu`のみが対象。フッター可視時にナビ非表示

### SSR初期値

`src/app/layout.tsx`の`<html>`に`data-visible-nav`属性をSSR時点で付与する。クライアントの`useContentsMenu`がマウント前であってもナビが見えている状態でハイドレートされるよう保証する目的。

## GlobalNavigation

### 表示要素

| 要素                                   | 表示条件                                         | 配置           |
| -------------------------------------- | ------------------------------------------------ | -------------- |
| サイト名（`Labが行く`→`/`）            | 常時                                             | 左             |
| 補助リンク（`Labが聞く`→`/interview`） | `usePathname()`が`/interview/[slug]`に一致時のみ | サイト名の右隣 |
| 目次popoverトリガー                    | `indexNavigationAtom`に要素がある時のみ          | 右             |
| ページ先頭へスクロールボタン           | 常時                                             | 最右端         |

### 目次popover

- HTML Popover APIを利用。トリガー`<button popoverTarget>`と`<div popover="auto">`をペアで配置
- アイコンは`lucide-react`の`List`（閉時）/`X`（開時）を切り替え。判定は`<div popover>`の`onToggle`イベントで`:popover-open`を読む
- 位置はCSS Anchor Positioningで決定。SP（narrow）は`position-area: top`で中央上、PC（fromWide）は`position-area: top span-left`で右端揃え
- popover内のリンク選択時は`hidePopover()`を呼び閉じる
- 表示する目次データは`indexNavigationAtom`を`useAtomValue`で購読

### ページ先頭へスクロール

- アイコンは`lucide-react`の`ArrowUp`
- クリックで`window.scrollTo(0, 0)`を実行（`<html>`の`scroll-behavior: smooth`によりスムーズスクロール）

## ContentsMenu

- `src/components/ContentsMenu/`配下のparts-component構造
- 自身を`useContentsMenu`を介し`IntersectionObserver`へ登録し、可視状態を全インスタンス横断で集約する（前述の`data-visible-nav`制御に利用）
- 同一コンポーネントを複数箇所で利用するため、各呼び出し側からのレイアウト制御は`className`プロップで受け取る

## 目次データの状態共有

`indexNavigationAtom`（`src/data/store.ts`）で`InterviewDetailView`と`GlobalNavigation`の間を接続する。書き込み・購読の規約は[コンポーネント設計](./components.md#コンポーネント間の状態共有)を参照。

## 関連ファイル

- `src/components/layout/GlobalNavigation/`
- `src/components/layout/AppFooter/`
- `src/components/ContentsMenu/`
- `src/data/store.ts`: `indexNavigationAtom`
- `src/app/layout.tsx`: `data-visible-nav`属性のSSR初期値
- `src/app/providers.tsx`: jotaiのProvider
