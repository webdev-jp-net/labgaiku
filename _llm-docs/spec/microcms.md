# microCMS連携仕様

## 概要

Labが聞くのインタビュー記事（`interview`コンテンツ）はmicroCMS（ヘッドレスCMS）に保管し、Next.js App Routerのサーバーコンポーネントから取得・描画する。本ドキュメントはmicroCMS側のコンテンツモデルと、Next.js側の取得・プレビュー実装を一括して定義する。

## 環境変数

`.env`に以下を定義する。

- `MICROCMS_SERVICE_DOMAIN`：サービスドメイン（例:`labgaiku`）
- `MICROCMS_API_KEY`：APIキー（サーバー側のみで使用）
- `MICROCMS_PREVIEW_SECRET`：microCMS画面プレビューURLに含めるトークン（ランダム生成・サーバー側のみで使用）

## コンテンツモデル（interview）

| フィールドID   | 表示名         | 型           | 必須 | 備考                                                                                                                                   |
| -------------- | -------------- | ------------ | :--: | -------------------------------------------------------------------------------------------------------------------------------------- |
| `visibility`   | 公開範囲       | select       |  ○   | 初期値`secret`。選択肢:`secret`,`limited`,`public`                                                                                     |
| `guest`        | ゲスト         | text         |  ○   | 一意制約あり                                                                                                                           |
| `date`         | 開催日         | date         |  ー  | 日付形式で保存                                                                                                                         |
| `title`        | タイトル       | text         |  ー  |                                                                                                                                        |
| `introduction` | 序文           | richEditorV2 |  ー  | `content`と同じ書式・整形を適用し、`content`の直前に表示する                                                                           |
| `content`      | 本文           | richEditorV2 |  ー  | 見出し/段落/装飾/表などが利用可能                                                                                                      |
| `allowList`    | 閲覧許可リスト | textArea     |  ー  | `limited`時の閲覧許可リスト。1行1値・改行区切り。`@`を含む行はメールアドレス、含まない行はドメインとして判定。前後空白と大小文字は無視 |

### 表示権限

> [!NOTE]
> このプロジェクトでは、インタビュー記事ごとに`visibility`を設け表示の範囲を設定しています。

- `secret`：制作途中、またはゲスト監修中の記事。`allowList`に該当するログインユーザのみ一覧で通常表示+リンク有効・詳細閲覧可。それ以外（未認証/非該当の認証ユーザ）は一覧から完全除外。詳細URL直アクセス時はログイン促しViewを表示するが、タイトルとゲスト名は伏せ字（`＊＊＊＊＊`）にして、公開範囲ラベルのみ`secret`として残す
- `limited`：限定公開。一覧ではタイトル・日付・公開範囲ラベルを通常表示しつつ、ゲストは伏せ字（`＊＊＊＊＊`）にする。リンクは権限の有無にかかわらず常に有効で、`allowList`に該当しない閲覧者がクリックした場合は詳細ページのログイン促しViewへ遷移する（タイトル・日付・公開範囲ラベルは引き継いで表示し、ゲストは伏せ字で表示）
- `public`：全公開。一覧で通常表示+リンク有効、詳細は誰でも閲覧可（認証不要）

### `allowList`の判定ルール

各行をトリム+小文字化し、空行を除外したうえで:

- `@`を含む行 → メールアドレスとして完全一致判定（ログインユーザのメールと比較）
- `@`を含まない行 → ドメインとして一致判定（ログインユーザのメールの`@`以降と比較）

## 実装ディレクトリ構成

```
src/
├── app/
│   ├── (contents)/
│   │   └── interview/
│   │       ├── page.tsx
│   │       ├── _parts/
│   │       └── [slug]/
│   │           ├── page.tsx
│   │           └── _parts/
│   └── api/
│       ├── draft/
│       │   └── route.ts
│       └── disable-draft/
│           └── route.ts
└── lib/
    └── api/
        └── microcms.ts
```

- `microcms.ts`：クライアント生成・`Interview`型定義・取得関数（`getInterviewList`／`getInterviewById`）
- `page.tsx`：一覧ページ（サーバーコンポーネント）
- `_parts/`：一覧のview/フック（`useInterviewIndex`経由）
- `page.tsx`：詳細ページ（整形を集約しフックは置かない）
- `_parts/`：詳細のview／`LoginPrompt`／`MemberList`／`IndexNavigation`
- `route.ts`：画面プレビュー受け口（draft）
- `route.ts`：Draft Mode解除（disable-draft）

繰り返しUIは`components/`配下のparts-componentに切り出す。

## 取得処理の方針

- App Routerのサーバーコンポーネントで`getInterviewList`／`getInterviewById`を呼び出す
- 一覧取得時は`orders: '-date'`を渡し、開催日が新しい順に並んだ状態で取得する
- 取得結果は`page.tsx`で表示用の派生値を組み立てたうえで`_parts`のViewへ渡す

判定ロジック（`canViewInterview`）は`src/lib/permission.ts`に集約。伏せ字定数（`MASK_PLACEHOLDER`）も同ファイル。

## プレビュー機能

microCMS管理画面の「画面プレビュー」から下書き中のインタビューをNext.js側で表示する機能。Next.js App RouterのDraft Modeで動的レンダリングへ切り替え、`draftKey`はURLクエリで詳細ページへ持ち回す形で実装する（Next.js + microCMSコミュニティで標準的な構成）。

### microCMS管理画面側のURL登録

microCMS管理画面の `interview` APIのコンテンツ設定→画面プレビューに下記URLを登録する。`<TOKEN>`は`MICROCMS_PREVIEW_SECRET`の値。

```
https://<host>/api/draft?secret=<TOKEN>&slug={CONTENT_ID}&draftKey={DRAFT_KEY}
```

`{CONTENT_ID}`／`{DRAFT_KEY}`はmicroCMS側で実値に置換される。`{DRAFT_KEY}`は **コンテンツが下書き状態（または「公開かつ下書き」「予約公開」「公開かつ予約公開」）のときのみ実値に置換** され、純粋な公開コンテンツでは空文字になる。

### 実装ファイル

```
src/
└── app/
    ├── api/
    │   ├── draft/
    │   │   └── route.ts
    │   └── disable-draft/
    │       └── route.ts
    └── (contents)/
        └── interview/
            └── [slug]/
                └── page.tsx
```

- `route.ts`（draft）：`secret`／`slug`／`draftKey`を検証→Draft Modeを有効化→`/interview/{slug}?draftKey=<key>`へリダイレクト
- `route.ts`（disable-draft）：Draft Mode解除→`/interview`へリダイレクト
- `page.tsx`（インタビュー詳細）：`draftMode().isEnabled`が`true`かつURLクエリに`draftKey`が含まれるとき、その`draftKey`を`getInterviewById`に渡し、`canViewInterview`の判定をスキップする

### Cookieの挙動

- `__prerender_bypass`：Next.js Draft Modeが自動付与（動的レンダリングへ切り替えるフラグ。Next.jsが内部管理する標準のCookieで、アプリ側で名前を持つ独自Cookieは使わない）

### `canViewInterview`スキップの適用範囲

プレビューURLに`MICROCMS_PREVIEW_SECRET`が含まれることでmicroCMS管理画面の編集者本人と検証できるため、`limited`／`secret`記事の閲覧許可リストは判定せずに本文を表示する方針。本プロダクトはmicroCMSをセキュリティ境界として信頼する設計のため、Next.js側で二重ガードは設けない。

スキップは **URLクエリに`draftKey`が乗っている記事ページに対してだけ** 効く。Draft Modeが有効な状態で別の`limited`／`secret`記事のURLを直叩きしても、URLに`draftKey`がなければ通常の`canViewInterview`判定が走るため、本文は素通りしない。`draftKey`の正当性はmicroCMS API側で検証される（不正な`draftKey`では下書きを取得できない）ため、URLにdraftKeyを乗せる方式でも安全性は確保される。

## 関連ドキュメント

- [インタビュー記事整形仕様](./frontend/interview-render.md)
- [ルーティング仕様](./frontend/routing.md)
- [認証仕様](./backend/next-auth.md)
