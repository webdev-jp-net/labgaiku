# コンポーネント設計

## 概要

Next.js App Router + React 19 + TypeScriptを前提としたコンポーネント分割指針。UIライブラリは採用しておらず、SCSS Modulesで最小限の装飾を行う。

## 設計原則

### View / Logic分離

- `*.tsx`はView（表示責務）のみ
- `use*.ts`はLogic（状態管理・データ変換ロジック）を担当
- App Routerのページでも`_parts`ディレクトリを用いて責務を分割

### 単一責任

- 1つのコンポーネントが扱う責務は明確に絞る
- ページ固有の処理は`src/app/(...)/[page]/_parts/`へ配置
- ページ固有でも繰り返し使うUI部品は`_parts/components/[ComponentName]/`にparts-component構造で切り出す

### 型安全

- すべてのProps/戻り値にTypeScript型を付与
- 必要な型は`src/lib`配下で共有

## ディレクトリ構造

```
src/
├── app/                            # App Routerのページ・レイアウト
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx + _parts/          # Home
│   ├── (contents)/                 # AppHeader/AppFooter/<main>を提供するlayout配下
│   │   └── interview/              # 一覧と詳細[slug]、各page.tsx + _parts/
│   └── api/auth/[...nextauth]/     # NextAuth API
├── components/layout/              # 共通レイアウト（parts-component構造）
└── lib/                            # NextAuth設定/権限判定/サニタイズ/日付整形/microCMSクライアント
```

各ページの`_parts/`にはView（`view.tsx`）とLogic（`use*.ts`）とSCSS（`*.module.scss`）を配置し、ページ内で繰り返し使うUIは`_parts/components/[ComponentName]/`にparts-component構造で切り出す。

## scaffdogテンプレート

- `page-component.md`: App Router用ページ雛形（`page.tsx` + `_parts/view.tsx` + `_parts/use*.ts` + `_parts/page.module.scss`）
- `parts-component.md`:汎用コンポーネント雛形（`[Name]/index.ts` + `[Name].tsx` + `[Name].module.scss`）
- 詳細は[コンポーネント生成ガイド](../../operation/generate-component.md)

## 命名規則

- ディレクトリ/コンポーネント名: PascalCase
- hook名:`useXxx`形式（PascalCaseで命名）
- SCSS:`*.module.scss`、クラス名は辞書に準拠

## View層の責務

- UI描画
- 最小限のイベントハンドリング（処理本体はhookへ委譲）
- `_parts/view.tsx`は`"use client"`で宣言し、サーバー側から受け取ったデータを表示

## Logic層の責務

- `use*.ts`に状態管理・データ変換ロジックを配置
- API呼び出しは`src/lib`の関数を利用
- hookはViewに必要な値・ハンドラーを返却

## コンポーネント間の状態共有

- 異なるコンポーネントから同じ状態を読み書きする場合は`jotai`のatomを使用し、`src/data/store.ts`に集約する
- Providerは`src/app/providers.tsx`に置き、root layoutで全体を包む（SSRでグローバルストアをリクエスト間共有しないため必須）
- 書き込み側は状態の起点（多くは`_parts/view.tsx`）が`useEffect`内で`useSetAtom`を呼び、unmount時に初期値へクリアする
- 読み込み側は`useAtomValue`で購読する

## 共通コンポーネント

- `src/components/layout/`にレイアウト系を集約（`AppHeader`/`AppFooter`）
- いずれもparts-component構造（フォルダー内に`index.tsx`/`*.tsx`/`*.module.scss`、必要に応じて`use*.ts`）
- 認証UIは専用の共有コンポーネントを置かず、必要箇所（AppHeader/AppFooter/`LoginPrompt`）にインラインで`signIn`/`signOut`を呼ぶボタンを配置する方針
- `GlobalNavigation`/`AppFooter`/`ContentsMenu`の連携と`data-visible-nav`属性による可視制御は[ナビゲーション仕様](./navigation.md)を参照

## 補足

- Chakra UI等の外部UIライブラリは未使用
- 装飾は仕様で明示された範囲のみ実装し、共通スタイルは`src/styles`配下で管理
