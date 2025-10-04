# コンポーネント設計

## 概要

Next.js App Router + React 19 + TypeScript を前提としたコンポーネント分割指針。UIライブラリは採用しておらず、SCSS Modules で最小限の装飾を行う。

## 設計原則

### View / Logic 分離
- `*.tsx` は View（表示責務）のみ
- `use*.ts` は Logic（状態管理・イベント処理）を担当
- App Router のページでも `_parts` ディレクトリを用いて責務を分割

### 単一責任
- 1 つのコンポーネントが扱う責務は明確に絞る
- ページ固有の処理は `src/app/(...)/[page]/_parts/` へ配置

### 型安全
- すべての Props / 戻り値に TypeScript 型を付与
- 必要な型は `src/lib` 配下で共有

## ディレクトリ構造

```
src/
├── app/
│   ├── page.tsx                # Home（サーバーコンポーネント）
│   ├── _parts/
│   │   ├── view.tsx            # HomeView（クライアント）
│   │   └── useHome.ts          # Home向けフック
│   └── (authenticated)/app/
│       ├── page.tsx
│       └── _parts/
│           ├── view.tsx
│           └── useApp.ts
├── components/
│   └── auth/                   # 共通利用コンポーネント
│       ├── SessionWrapper.tsx
│       ├── SignIn.tsx
│       └── SignOut.tsx
└── lib/
    └── api/
        └── microcms.ts
```

## scaffdog テンプレート
- `page-component.md` : App Router 用ページ雛形（`page.tsx` + `_parts`）
- `parts-component.md` : 汎用コンポーネント雛形
- 詳細は [コンポーネント生成ガイド](../../operation/generate-component.md)

## 命名規則
- ディレクトリ / コンポーネント名: PascalCase
- hook 名: `use` プレフィックス + PascalCase
- SCSS: `*.module.scss`、クラス名は辞書に準拠

## View層の責務
- UI描画
- 最小限のイベントハンドリング（処理本体はhookへ委譲）
- `_parts/view.tsx`は`"use client"`で宣言し、サーバー側から受け取ったデータを表示

## Logic層の責務
- `use*.ts`に状態管理・データ変換ロジックを配置
- API呼び出しは`src/lib`の関数を利用
- hookはViewに必要な値・ハンドラを返却

## 共通コンポーネント
- `src/components/auth` など再利用可能な単位で配置
- 認証系は `SignIn` / `SignOut` / `SessionWrapper`
- 今後の増設も同じ方針で配置する

## 補足
- Chakra UI等の外部UIライブラリは未使用
- 装飾は仕様で明示された範囲のみ実装し、共通スタイルは`src/styles`配下で管理