# コンポーネント設計

## 概要

React 19 + TypeScript + Chakra UIを基盤とした、効率的なコンポーネント設計方針です。

## 設計原則

### Chakra UI優先
- 基本UIコンポーネント（Button、Input、Modal等）はChakra UIを使用
- カスタムコンポーネントは機能固有・プロジェクト固有のもののみ作成

### 単一責任の原則
- 各コンポーネントは1つの責任のみを持つ
- 複雑な機能は複数のコンポーネントに分割

### 型安全性
- すべてのPropsにTypeScript型定義を必須
- 厳密な型チェックでランタイムエラーを予防

### View/Logic分離
- **\*.tsx**: Viewの責務（UI表示・レンダリング）
- **use\*.ts**: Logicの責務（状態管理・ビジネスロジック・API呼び出し）
- 明確な責任分離により保守性とテスタビリティを向上

## ディレクトリ構造（vite.config.ts alias準拠）

```
src/
├── components/             # 機能をまたぐ共通コンポーネント
├── layout/                 # レイアウトコンポーネント
└── pages/                  # ページコンポーネント
    ├── Home/               # ダッシュボード
    ├── TimeTrackingIndex/  # 稼働時間管理
    ├── CaseSalesIndex/     # 案件別売上
    ├── MasterIndex/        # マスター管理
    └── ...                 # その他のページ
```

### ページコンポーネント構造例
```
pages/TimeTrackingIndex/
├── index.ts                       # Re-export
├── TimeTrackingIndex.tsx          # View層
├── useTimeTrackingIndex.ts        # Logic層
├── TimeTrackingIndex.module.scss # スタイル
└── components/                    # ページ固有コンポーネント
    └── MonthlyGrid/
        ├── index.ts               # Re-export
        ├── MonthlyGrid.tsx        # View層
        └── useMonthlyGrid.ts      # Logic層
```

## scaffdog活用

### コンポーネント生成

プロジェクトではscaffdogを使用してコンポーネントを効率的に生成します：

[コンポーネント生成ガイド](../../operation/generate-component.md) を参照してください。

## 命名規約

### ファイル・ディレクトリ
- **PascalCase**: コンポーネント名（例: `TimeTracker`）
- **index.ts**: Re-export用ファイル
- **ComponentName.tsx**: メインコンポーネントファイル（View責務）
- **useComponentName.ts**: カスタムフック（Logic責務）
- **ComponentName.module.scss**: スタイルファイル

### Props・State
- **camelCase**: プロパティ名
- **Interface**: `ComponentNameProps`形式

## 実装例

### 基本的な実装パターン

#### View層（\*.tsx）
```typescript
// コンポーネントはUIの表示のみに集中
export const ComponentName: React.FC = () => {
  const { data, handlers } = useComponentName()
  
  return (
    <ChakraUIComponent>
      {/* UI表示とイベント受け取りのみ */}
    </ChakraUIComponent>
  )
}
```

#### Logic層（use\*.ts）
```typescript
// ビジネスロジック・状態管理・API呼び出しを担当
export const useComponentName = () => {
  // Jotai Atomとの連携
  // ビジネスロジック
  // API呼び出し
  
  return { data, handlers }
}
```

## View/Logic分離の指針

### View層（\*.tsx）の責務
- **UI表示**: JSX/TSXによるレンダリング
- **イベントハンドリング**: ユーザー操作の受け取り（ロジックは呼び出すのみ）
- **スタイリング**: Chakra UIコンポーネントの組み合わせ
- **条件分岐**: 表示/非表示の制御

### Logic層（use\*.ts）の責務
- **状態管理**: Jotai Atomとの連携
- **ビジネスロジック**: データ変換・計算・バリデーション
- **API呼び出し**: GraphQL操作・外部API連携
- **副作用処理**: useEffect等による非同期処理

### 分離のメリット
- **テスタビリティ**: Logic層を独立してテスト可能
- **再利用性**: 同じロジックを複数のViewで使用可能
- **保守性**: 責任が明確で変更影響範囲が限定的
- **可読性**: ViewとLogicが分離され理解しやすい

## コンポーネント配置指針

### src/components/ (機能をまたぐ共通)
- 複数のページで使用されるコンポーネント
- ビジネスロジックを含む再利用可能なコンポーネント
- 例: `WorkLogCard`, `ProjectSelector`, `DatePicker`

### src/pages/[PageName]/components/ (ページ固有)
- 特定のページでのみ使用されるコンポーネント
- そのページの機能に特化したコンポーネント
- 例: `Home/components/StatsCard`, `TimeTrackingIndex/components/MonthlyGrid`

### src/layout/ (レイアウト)
- アプリケーション全体のレイアウト構造
- ヘッダー、サイドバー、フッターなど
- 例: `Header`, `Sidebar`, `AppLayout`

## パフォーマンス考慮

### React.memo使用
```typescript
// 不要な再レンダリングを防ぐ
export const StatsCard = React.memo<StatsCardProps>(({ label, value, color }) => {
  // コンポーネント実装
})
```

### 遅延読み込み
```typescript
// 大きなコンポーネントの遅延読み込み
const ReportsPage = React.lazy(() => import('pages/Reports'))
```

## 関連ドキュメント

- [コンポーネント生成ガイド](../../operation/generate-component.md)
- [スタイリング方針](./style.md)