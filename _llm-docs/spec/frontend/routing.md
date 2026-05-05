# ルーティング仕様

## 概要

Next.js App Router（`src/app`）を利用したルーティング構成。

## ルート構成

| ルート              | 認証               | 説明                                                                                                                                         |
| ------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                 | 不要               | トップページ                                                                                                                                 |
| `/interview`        | 不要               | インタビュー一覧（誰でもアクセス可。`limited`は非該当ユーザにタイトル/ゲストを伏せ字表示・日付は生表示、`secret`は非該当ユーザから完全除外） |
| `/interview/{slug}` | `visibility`による | インタビュー詳細（`public`は誰でも、`limited`/`secret`は記事ごとの`allowList`判定。非該当ユーザの直アクセス時はログイン促しViewを表示）      |
| `/api/auth/*`       | -                  | NextAuthエンドポイント                                                                                                                       |

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

- `src/app/layout.tsx`: ルートlayout（`<html>`/`<body>`とフォントのみ。AppHeaderは含まない）
- `src/app/page.tsx`: トップページ（Home。AppHeader/AppFooterは表示されない）
- `src/app/_parts/`: Homeのビュー/フック
- `src/app/(contents)/layout.tsx`: コンテンツ用layout（`getServerSession`を呼び、`AppHeader`/`AppFooter`へsessionをpropで渡す。`<main>`を提供）
- `src/app/(contents)/interview/page.tsx`: インタビュー一覧（サーバーコンポーネント）
- `src/app/(contents)/interview/_parts/`: 一覧ページのビュー/フック/`InterviewItem` parts-component
- `src/app/(contents)/interview/[slug]/page.tsx`: インタビュー詳細
- `src/app/(contents)/interview/[slug]/_parts/`: 詳細ページのビュー/フック/`LoginPrompt` parts-component
- `src/app/api/auth/[...nextauth]/route.ts`: NextAuth API

> route group `(contents)`はURLに出ないため、URLパス（`/interview`, `/interview/{slug}`）は変わりません。

## エラーハンドリング

- 存在しないスラッグ/microCMS取得失敗は`notFound()`を返し404扱い
- `secret`/`limited`で`allowList`非該当のユーザによる詳細URL直アクセスは、404ではなくログイン促しViewを返す
- 認証エラーはNextAuth側で処理し`/api/auth/signin`経由のフローへ誘導

## 関連ドキュメント

- [コンポーネント設計](./components.md)
- [microCMS連携仕様](./microcms.md)
- [認証仕様](../backend/next-auth.md)
