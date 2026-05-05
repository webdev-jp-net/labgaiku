# コンポーネント設計

## 概要

Next.js App Router + React 19 + TypeScriptを前提としたコンポーネント分割指針。UIライブラリは採用しておらず、SCSS Modulesで最小限の装飾を行う。

## 設計原則

### View / Logic 分離

- `*.tsx` はView（表示責務）のみ
- `use*.ts` はLogic（状態管理・イベント処理）を担当
- App Routerのページでも `_parts` ディレクトリを用いて責務を分割

### 単一責任

- 1つのコンポーネントが扱う責務は明確に絞る
- ページ固有の処理は `src/app/(...)/[page]/_parts/` へ配置

### 型安全

- すべてのProps / 戻り値にTypeScript型を付与
- 必要な型は `src/lib` 配下で共有

## ディレクトリ構造

```
src/
├── app/
│   ├── layout.tsx                          # Root layout（フォント/SessionWrapper のみ。AppHeaderなし）
│   ├── page.tsx                            # Home（サーバーコンポーネント、AppHeaderなし）
│   ├── _parts/
│   │   ├── view.tsx                        # HomeView（クライアント）
│   │   ├── useHome.ts                      # Home向けフック
│   │   ├── page.module.scss
│   │   └── font/                           # next/font/local の woff2
│   ├── (contents)/
│   │   ├── layout.tsx                      # Contents layout（AppHeader と <main> を提供）
│   │   └── interview/
│   │       ├── page.tsx                    # InterviewIndexPage（一覧、サーバー）
│   │       ├── _parts/
│   │       │   ├── view.tsx                # InterviewIndexView（クライアント）
│   │       │   ├── useInterviewIndex.ts    # 一覧向けフック
│   │       │   └── view.module.scss
│   │       └── [slug]/
│   │           ├── page.tsx                # InterviewDetailPage（詳細、サーバー）
│   │           └── _parts/
│   │               ├── view.tsx            # InterviewArticleView（クライアント）
│   │               └── view.module.scss
│   └── api/
│       └── auth/[...nextauth]/route.ts     # NextAuth API
├── components/
│   ├── auth/                               # 認証系共通コンポーネント
│   │   ├── SessionWrapper.tsx
│   │   ├── SignIn.tsx
│   │   └── SignOut.tsx
│   └── layout/                             # レイアウト共通コンポーネント
│       ├── AppHeader.tsx
│       └── AppHeader.module.scss
└── lib/
    ├── auth.ts                             # NextAuth authOptions
    ├── permission.ts                       # canViewInterview など閲覧可否判定
    ├── sanitize.ts                         # HTML サニタイズ
    └── api/
        └── microcms.ts                     # microCMS クライアント / 取得ラッパー
```

## scaffdog テンプレート

- `page-component.md` : App Router用ページ雛形（`page.tsx` + `_parts`）
- `parts-component.md` : 汎用コンポーネント雛形
- 詳細は [コンポーネント生成ガイド](../../operation/generate-component.md)

## 命名規則

- ディレクトリ / コンポーネント名: PascalCase
- hook名: `use` プレフィックス + PascalCase
- SCSS: `*.module.scss`、クラス名は辞書に準拠

## View 層の責務

- UI描画
- 最小限のイベントハンドリング（処理本体はhookへ委譲）
- `_parts/view.tsx` は `"use client"` で宣言し、サーバー側から受け取ったデータを表示

## Logic 層の責務

- `use*.ts` に状態管理・データ変換ロジックを配置
- API呼び出しは `src/lib` の関数を利用
- hookはViewに必要な値・ハンドラーを返却

## 共通コンポーネント

- `src/components/auth` など再利用可能な単位で配置
- 認証系は `SignIn` / `SignOut` / `SessionWrapper`
- 今後の増設も同じ方針で配置する

## 補足

- Chakra UI等の外部UIライブラリは未使用
- 装飾は仕様で明示された範囲のみ実装し、共通スタイルは `src/styles` 配下で管理
