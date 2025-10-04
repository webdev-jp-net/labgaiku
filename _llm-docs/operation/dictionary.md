# 開発用ネーミング辞書

## 概要
このドキュメントは、開発における統一的なネーミング規約を定めたものです。
コードベース、UI/UX、データベース、API設計における表記揺れを防ぎ、一貫性のある開発を促進します。

## プロジェクト名称

**日本語文脈での呼称**: ワークログ
**英字表記のslug**: work-log

**用途別指示**: 
- 日本語の文脈でプロジェクトを呼称するとき → 「ワークログ」
- プログラムなど英字表記でプロジェクトを表すslugが必要なとき → 「work-log」

## 基本原則
- **統一性**: 同じ概念には同じ名称を使用
- **可読性**: 開発者が理解しやすい名称を選択
- **国際化対応**: 英語と日本語の対応関係を明確化

## 主要エンティティ

### 認証・認可関連
| 日本語     | 英語（コード） | 説明                     | 使用場面    |
| ---------- | -------------- | ------------------------ | ----------- |
| ログイン   | login          | システムへのログイン     | DB、API、UI |
| ログアウト | logout         | システムからのログアウト | API、UI     |
| セッション | session        | ユーザーセッション       | DB、API     |

## コンテンツ名称
| 日本語       | 英語（コード） | 説明                 | 使用場面         |
| ------------ | -------------- | -------------------- | ---------------- |
| 稼働時間     | time-tracking  | 稼働時間の記録       | ルーティング、UI |
| 案件別       | case-sales     | 案件別の売上解析     | ルーティング、UI |
| 月別         | monthly-sales  | 月別の売上解析       | ルーティング、UI |
| マスター管理 | master-data    | マスターデータの設定 | ルーティング、UI |

## データベース命名規則

### テーブル名
- **形式**: 複数形・スネークケース
- **例**: `clients`, `projects`, `cases`, `work_logs`, `personal_settings`

### カラム名
- **形式**: スネークケース
- **例**: `created_at`, `updated_at`, `client_id`, `project_id`, `case_id`

### 主キー
- **形式**: `id`（単数形）
- **例**: `id`

### 外部キー
- **形式**: `{テーブル名}_id`（単数形）
- **例**: `client_id`, `project_id`, `case_id`

## API命名規則

### 基本原則

RESTful APIの設計原則に従う

### RESTful APIパターン
| HTTPメソッド | パス形式         | 用途             | 例              |
| ------------ | ---------------- | ---------------- | --------------- |
| GET          | /[resource]      | リソース一覧取得 | GET /cases      |
| GET          | /[resource]/[id] | 特定リソース取得 | GET /cases/1    |
| POST         | /[resource]      | 新規リソース作成 | POST /cases     |
| PUT          | /[resource]/[id] | 既存リソース更新 | PUT /cases/1    |
| DELETE       | /[resource]/[id] | リソース削除     | DELETE /cases/1 |

### リソース名
- **形式**: 単数形
- **例**: `case`, `project`, `client`, `workLog`

### パラメーター
- **形式**: キャメルケース
- **例**: `clientId`, `projectId`, `caseId`, `paymentMonth`

### レスポンス
- **形式**: キャメルケース
- **例**: `createdAt`, `updatedAt`, `isActive`

## フロントエンド命名規則

### コンポーネント名
- **形式**: パスカルケース
- **例**: `TimeTrackingGrid`, `CaseSalesTable`, `MonthlySalesChart`

### CSS クラス名
- **形式**: キャメルケース（CSS Module使用）
- **例**: `header`, `card`, `button`
- **コンディション**: 先頭にハイフン2つ `--isActive`, `--isDisabled`
- **原則**: 可読性重視の意味ベースな短いネーミングを奨励

### ルーティング

| アクション | パス形式                              | 説明                   | 例                                              |
| ---------- | ------------------------------------- | ---------------------- | ----------------------------------------------- |
| 機能画面   | /[feature]/                           | 機能のメイン画面       | /time-tracking/, /case-sales/                   |
| 一覧表示   | /[resource]/ または /[resource]/index | リソースの一覧画面     | /cases/, /projects/                             |
| 新規作成   | /[resource]/create                    | 新規作成フォーム画面   | /cases/create, /projects/create                 |
| 詳細表示   | /[resource]/[id]/                     | 個別リソースの詳細画面 | /cases/[id]/, /projects/[id]/                   |
| 編集       | /[resource]/[id]/edit                 | 既存リソースの編集画面 | /cases/[id]/edit, /projects/[id]/edit           |
| 完了       | /[resource]/[action]/complete         | 既存リソースの完了画面 | /cases/create/complete, /projects/edit/complete |

## 参考資料
- [UI/UXデザイン表記規約](./naming-ui-ux.md)
- [要件定義書](../project.md)
