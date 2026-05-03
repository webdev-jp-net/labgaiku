# 開発用ネーミング辞書

## 概要
このドキュメントは、`labgaiku` プロジェクトで用いる名称を統一するための辞書です。

## プロジェクト名称
- **日本語名称**: Labが行く
- **英字表記スラグ**: `labgaiku`

## 基本原則
- 同一概念には同一名称を使用する
- 表示（日本語）とコード（英語）で対応関係を明確にする
- セマンティックな命名を優先する

## ドメイン固有用語
| 日本語       | コード表記 | 説明                            | 使用例                 |
| ------------ | ---------- | ------------------------------- | ---------------------- |
| インタビュー | interview  | microCMSの`interview`コンテンツ | APIレスポンス、型定義  |
| 公開範囲     | visibility | `secret`/`limited`/`public`     | フィルタリング、UI表示 |
| ゲスト       | guest      | インタビュー対象者              | UI表示                 |
| 開催日       | date       | ラボ企画の開催日                | UI表示                 |
| 本文         | content    | インタビュー本文（HTML）        | 表示、サニタイズ       |

## 認証関連
| 日本語     | コード表記 | 説明                       |
| ---------- | ---------- | -------------------------- |
| ログイン   | login      | NextAuthの`signIn`/UI文言  |
| ログアウト | logout     | NextAuthの`signOut`/UI文言 |

## フロントエンド命名規則

複数形を表す際は、末尾に`s`をつけず接尾辞として`List`を使用してください。

## コンポーネント命名
- **形式**: PascalCase（例: `HomeView`, `InterviewDetailView`）
- 役割に応じて `_parts/view.tsx`（表示）と `use*.ts`（ロジック）に分割
- 共通レイアウトは `components/layout/` に配置

## CSSクラス命名
- **形式**: CSS Modules のキャメルケース
- セマンティックな名称を使用（例: `list`, `listItem`, `body`）
- 状態を表す場合は `--isActive` のように接尾辞で表現

## ルーティング
| 画面 | パス                | 説明                                  |
| ---- | ------------------- | ------------------------------------- |
| トップ | `/`               | トップページ（現状は空）              |
| 一覧 | `/interview`        | インタビュー一覧（認証不要）          |
| 記事 | `/interview/{slug}` | インタビュー記事（`visibility` 判定） |
| 認証 | `/api/auth/*`       | NextAuthエンドポイント                |

## API / 型命名
- microCMSのレスポンス型は `Interview` などPascalCaseで定義
- パラメーターはキャメルケース（例: `slug`, `visibility`）
- 環境変数は `MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY` を使用

## 参考
- [UI/UXデザイン表記規約](./naming-ui-ux.md)
- [システム仕様](../spec/index.md)
