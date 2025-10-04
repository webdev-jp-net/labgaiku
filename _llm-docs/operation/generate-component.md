# コンポーネント生成ガイド

## 概要

このドキュメントは、React/TypeScriptプロジェクトにおいて、scaffdogテンプレートを使用してコンポーネントを生成する手順を説明します。

**適用範囲**: React/TypeScriptによるフロントエンド開発のみ

## 利用可能なテンプレート

`.scaffdog`ディレクトリで定義されているテンプレート:

- `hooks.md` - カスタムReactフック
- `page-component.md` - ページコンポーネント（ルーティング対応）
- `parts-component.md` - 再利用可能なUI部品

**注意**: 生成後のカスタマイズ（ロジック実装、API連携、スタイル調整など）は別タスクとして扱います。

## 生成されるファイル構造

scaffdogは以下の構造でファイルを生成します：

```
[ComponentName]/
├── index.ts                    # エクスポート用
├── [ComponentName].tsx         # コンポーネント本体
├── use[ComponentName].ts       # カスタムフック
└── [ComponentName].module.scss # スタイル
```

※ parts-componentの場合は`.stories.tsx`ファイルも生成されます。

## 前提条件

- scaffdogがプロジェクトにインストール済み
- 該当するテンプレートファイルが`.scaffdog/`ディレクトリに存在

## ページコンポーネント生成

### 概要

routing.mdで定義されたページコンポーネントを生成します。

### 生成手順

#### scaffdogコマンドでの生成

scaffdogコマンドを使用してコンポーネントを生成します。認証の要否に応じてディレクトリを分けて配置します。

```bash
# 認証必要ページの生成（pages/_authenticated 配下に生成）
npx scaffdog generate page-component --output "pages/_authenticated" --answer "name:AccountIndex"

# 認証不要ページの生成（pages/_unauthenticated 配下に生成）
npx scaffdog generate page-component --output "pages/_unauthenticated" --answer "name:Login"
```

**重要**:
- 認証が必要なページは `pages/_authenticated`、認証不要ページは `pages/_unauthenticated` を `--output` に指定
- `--answer`でコンポーネント名を指定（3階層以上のパスは接頭辞として連結）
- 認証区分ごとのディレクトリ構造を必ず維持する


### 命名パターン別の生成例

#### 基本パターン

```bash
# 通常のページコンポーネント（認証あり）
npx scaffdog generate page-component --output "pages/_authenticated" --answer "name:NewsIndex"
npx scaffdog generate page-component --output "pages/_authenticated" --answer "name:AccountDetail"
```

**命名規則**:
- `{Resource}{Action}` (例: NewsIndex, AccountDetail)

### 生成後の確認事項

#### エイリアスの確認

インポート時はプロジェクトで定義されたエイリアスを使用します（すべて直接パス）：

```typescript
// 認証必要ページ
import { AccountDetail } from 'pages/_authenticated/AccountDetail'
import { LearningTechIndex } from 'pages/_authenticated/LearningTechIndex'

// 認証不要ページ
import { Login } from 'pages/_unauthenticated/Login'
import { RegisterAccount } from 'pages/_unauthenticated/RegisterAccount'

// 共通ページ
import { NotFound } from 'pages/NotFound'
```

### 注意事項

- **重複生成の防止**: すでに存在する場合は上書きされるため注意
- **作業ディレクトリ**: プロジェクトルートから実行すること

### トラブルシューティング

#### scaffdogコマンドが見つからない場合

```bash
# scaffdogのインストール確認
pnpm list scaffdog

# 必要に応じてインストール
pnpm add -D scaffdog
```

#### テンプレートが見つからない場合

```bash
# テンプレートの確認
ls -la .scaffdog/
cat .scaffdog/page-component.md
```

#### 生成に失敗する場合

- 作業ディレクトリがプロジェクトルートか確認
- コンポーネント名が正しい形式か確認（命名規則は[dictionary.md](./dictionary.md)を参照）

## パーツコンポーネント生成

### 概要

共通UIコンポーネントをscaffdogテンプレートで生成します。

### 生成手順

```bash
# パーツコンポーネントの生成
npx scaffdog generate parts-component --answer "name:Button"
npx scaffdog generate parts-component --answer "name:Modal"
npx scaffdog generate parts-component --answer "name:Card"
```
