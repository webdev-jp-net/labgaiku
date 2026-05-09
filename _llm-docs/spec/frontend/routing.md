# ルーティング仕様

## 概要

Next.js App Router（`src/app`）を利用したルーティング構成。

## ルート構成

| ルート               | 認証               | 説明                                                                                                                                                                                            |
| -------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                  | 不要               | トップページ                                                                                                                                                                                    |
| `/interview`         | 不要               | インタビュー一覧（誰でもアクセス可。`limited`は非該当ユーザにタイトル/ゲストを伏せ字表示・日付は生表示、`secret`は非該当ユーザから完全除外）                                                    |
| `/interview/{slug}`  | `visibility`による | インタビュー詳細（`public`は誰でも、`limited`/`secret`は記事ごとの`allowList`判定。非該当ユーザの直アクセス時はログイン促しViewを表示。Draft Mode中は`allowList`判定をスキップして本文を表示）  |
| `/api/auth/*`        | -                  | NextAuthエンドポイント                                                                                                                                                                          |
| `/api/draft`         | プレビュートークン | microCMS画面プレビュー用エンドポイント。`secret`/`slug`/`draftKey`を受け取り、`MICROCMS_PREVIEW_SECRET`と一致したらNext.js Draft Modeを有効化し`/interview/{slug}?draftKey=<key>`へリダイレクト |
| `/api/disable-draft` | -                  | Draft Modeを解除し`/interview`へリダイレクト                                                                                                                                                    |

## 認証フロー

- 一覧（`/interview`）は未ログイン状態でも閲覧可能
- 各インタビューの`visibility`と記事ごとの`allowList`で閲覧可否を判定
  - `secret`: `allowList`該当ログインユーザは一覧で通常表示+リンク有効、詳細閲覧可。非該当ユーザ（未認証含む）は一覧から完全除外、詳細URL直アクセス時はログイン促しViewを表示
  - `limited`: 一覧ではタイトル/ゲストを伏せ字+非リンク・日付のみ生で表示。`allowList`該当ログインユーザのみ伏せ字解除+リンク有効、詳細閲覧可。非該当ユーザの詳細URL直アクセスはログイン促しViewを表示
  - `public`: 一覧で通常表示。詳細は誰でも閲覧可
- ログイン/ログアウトは`AppHeader`、`AppFooter`、未認可詳細の`LoginPrompt`のいずれからも実施可能（誰でもサインイン可、グローバルなドメイン制限なし）
- `signIn`/`signOut`は`callbackUrl`を指定せず、操作前のページへ戻る挙動とする

詳細は[認証仕様](../backend/next-auth.md)を参照。

## ディレクトリ構造

```
src/
└── app/
    ├── layout.tsx
    ├── page.tsx
    ├── _parts/
    ├── (contents)/
    │   ├── layout.tsx
    │   └── interview/
    │       ├── page.tsx
    │       ├── _parts/
    │       └── [slug]/
    │           ├── page.tsx
    │           └── _parts/
    └── api/
        ├── auth/
        │   └── [...nextauth]/
        │       └── route.ts
        ├── draft/
        │   └── route.ts
        └── disable-draft/
            └── route.ts
```

- `layout.tsx`（root）：ルートlayout（`<html>`/`<body>`とフォントのみ・AppHeader非含有）
- `page.tsx`（root）：トップページ（Home・AppHeader/AppFooter非表示）
- `_parts/`（root）：Homeのview/フック
- `layout.tsx`（contents）：`getServerSession`で`AppHeader`/`AppFooter`にsessionをprop注入し`<main>`を提供
- `page.tsx`（インタビュー一覧）：インタビュー一覧
- `_parts/`（インタビュー一覧）：一覧のview/フック/`InterviewItem`
- `page.tsx`（インタビュー詳細）：インタビュー詳細
- `_parts/`（インタビュー詳細）：詳細のview/フック/`LoginPrompt`
- `route.ts`（auth）：NextAuth API
- `route.ts`（draft）：microCMS画面プレビュー受け口（Draft Mode有効化→`/interview/{slug}?draftKey=<key>`へリダイレクト）
- `route.ts`（disable-draft）：Draft Mode解除（`/interview`リダイレクト）

> route group `(contents)`はURLに出ないため、URLパス（`/interview`, `/interview/{slug}`）は変わりません。

## エラーハンドリング

- 存在しないスラッグ/microCMS取得失敗は`notFound()`を返し404扱い
- `secret`/`limited`で`allowList`非該当のユーザによる詳細URL直アクセスは、404ではなくログイン促しViewを返す
- 認証エラーはNextAuth側で処理し`/api/auth/signin`経由のフローへ誘導

## 関連ドキュメント

- [コンポーネント設計](./components.md)
- [microCMS連携仕様](../microcms.md)
- [認証仕様](../backend/next-auth.md)
