# AI開発者向けガイド

## 🇯🇵 コミュニケーション原則

**【重要】このプロジェクトでは、すべてのコミュニケーションを日本語で行います。**

- **チャット・やり取り**: 必ず日本語
- **質問・回答・説明**: すべて日本語
- **ドキュメント作成**: 日本語で記述
- **コメント・ログ**: 日本語

詳細は [言語設定](.kiro/steering/language.md) を参照してください。

## 開発フロー

### セッション開始時の必須手順

**すべてのタスクで必ず以下の順序で進行してください：**

1. **セッション制御ルール確認**
   - [セッション制御ルール](_llm-rules/session_control.md) を必ず最初に読み込み
   - MANDATORY PROCESS に従ってブランチ確認・基本原則読み込みを実行

2. **タスク分析・ルール選択**
   - session_control.md のタスク分析フレームワークでタスクタイプを特定
   - 適切な専門ルールを選択・読み込み

3. **プロジェクト要件確認**
   - [プロジェクト概要](_llm-docs/project.md) でプロジェクト全体像を把握
   - タスクに関連する仕様書を確認

4. **タスク計画・実装着手**
   - 必要ドキュメントを把握後、タスク計画を立案
   - 不明点は独自判断せずユーザーへ質問する
   - core_rules.md のプロセスに従って実装開始

5. **レビュー・コミット**
   - 実装完了後、必ずユーザーレビューを求める
   - レビュー承認後にコミット・PR作成

### 重要なドキュメント

**プロジェクト仕様**
- [プロジェクト概要](_llm-docs/project.md) - 全体像・要件定義
- [システム全体仕様](_llm-docs/spec/index.md) - 機能仕様

**技術仕様**
- [技術構成](_llm-docs/spec/tech_structure.md)
- [データベース設計](_llm-docs/spec/db_structure.md)
- [スタイリング方針](_llm-docs/spec/style.md)

**開発ガイド**
- [コンポーネント生成](_llm-docs/operation/generate-component.md)
- [命名規約](_llm-docs/operation/dictionary.md)
- [Amplify Gen2 セットアップ](_llm-docs/operation/amplify-gen2-setup.md)

## 開発原則

- **仕様書ファースト**: 実装前に必ず関連仕様書を確認
- **段階的実装**: MVP → 機能拡張の順序で開発
- **型安全性**: TypeScript strict mode での開発
- **セマンティック**: 意味のあるコンポーネント・クラス名

## 基本コマンド

```bash
# 開発
pnpm dev                    # 開発サーバー起動
pnpm build                  # ビルド
pnpm typecheck              # 型チェック

# 品質管理
pnpm lint                   # リント実行
pnpm lint:fix               # リント自動修正
pnpm format                 # コード整形

# テスト
pnpm test                   # テスト実行
pnpm test:watch             # テスト監視
pnpm test:coverage          # カバレッジ

# AWS Amplify
pnpm amplify-local          # サンドボックス起動
pnpm amplify-local:delete   # サンドボックス削除

# コンポーネント生成
pnpm scaffold               # scaffdog実行
```

## 注意事項

- **必須**: セッション開始時は必ず session_control.md を確認
- **必須**: 実装完了後は必ずユーザーレビューを求める
- **初期開発方針**: Lint・テストは省略し、基本機能実装に集中
- **MVP優先**: 最小限の機能で早期リリース
- **段階的改善**: 機能追加は段階的に実施