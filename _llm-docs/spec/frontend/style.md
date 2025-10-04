# スタイリング方針

## 概要
このドキュメントは、スタイリングに関する実装方針と参照先をまとめたものです。

## 技術スタック（スタイリング関連）

### 使用技術
- **Chakra UI**: UIコンポーネントライブラリ
- **CSS Modules + SCSS**: スタイリング
- **Chart.js / Recharts**: グラフ・可視化ライブラリ

## スタイリング哲学

### 基本方針
- **非ユーティリティファースト**: 意味のあるクラス名を使用
- **セマンティクス志向**: コンポーネントの役割を表すクラス名
- **CSS Modules**: スコープ化されたCSS（BEM命名不要）
- **SCSS**: ネストや変数を活用した保守性の高いスタイル
- **モジュラー設計**: コンポーネント単位でスタイルを管理

### DRY原則とlayerStyles
- 共通スタイルはlayerStylesで一元管理（theme.ts）
- 同じスタイル定義の重複を排除

### セマンティックスタイリング
- 装飾を表現した命名を避け、用途や意味を基準とした命名
- ユーティリティファースト設計禁止（スタイルの羅列より意味的な抽象化を優先）
- BEM命名禁止（CSS Modulesでスコープ分離済み）
- クラス名は[dictionary](../../../operation/dictionary.md#css-クラス名)準拠

## 利用可能なツール・リソース

### Chakra UI MCP
- コンポーネントの検索と仕様確認は`mcp__chakra-ui`ツールを活用
- 適切なセマンティックコンポーネントの選択
- プロパティや使用例の確認
- **実装時は必ずMCPツールでコンポーネント仕様を確認してから実装する**
- **オフィシャルドキュメントとの併用を強く推奨**

### テーマ設定
- Chakra UIのカスタムテーマ定義：`src/style/theme.ts`

### プロジェクト共通ドキュメント
- 命名規則：[開発用ネーミング辞書](../operation/dictionary.md)
- UI/UX表記：[UI/UXデザイン表記規約](../operation/naming-ui-ux.md)

## レスポンシブ対応

PC向けワイドスクリーンレイアウトのみ対象とする。  
タブレット・スマートフォン向けレイアウトは考慮しない。  

## 実装プロセス

### 基本実装（必須）
- **Chakra UI MCPツールでコンポーネント仕様確認**
- **オフィシャルドキュメントでの詳細確認**
- セマンティックなHTML構造の構築
- データフローと状態管理の実装
- Chakra UIのレイアウトコンポーネント（Stack、Grid等）による配置
- スペーシング調整
- 基本動作の確認

### 装飾の実装ルール

**装飾（色、影、ボーダー、アニメーション等）は以下の条件を満たす場合のみ実装可能：**
- 明確な参照実装が指示されている場合
- 既存コンポーネントの踏襲が要求されている場合

**明示的な指示がない装飾は禁止。**

## スタイル実装の原則

### TSXでの装飾ルール
- 指示がない提案レベルでの装飾追加は禁止
- 明示的な指示がある場合は実装可能
- 既存のプロジェクト内コードと同じ装飾を踏襲する場合は許可

### SCSS実装原則

#### 実装例
```scss
// 例: WorkLogForm.module.scss
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .formGroup {
    display: flex;
    flex-direction: column;
    
    .label {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .input {
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 0.375rem;
    }
  }
}
```

#### 単位の使用
**原則：remを基準とした相対値指定**

SCSSでの実装：
- rem関数を使用してpx値をremに変換

```scss
@use "style/_variable" as *;
.example {
  margin: rem(16);  // 16px → 1rem
  padding: rem(24); // 24px → 1.5rem
}
```

TSXでの実装：
- pxをそのまま使わず、必ずremに変換して指定

```tsx
// 推奨
<Box mt="1.5rem" p="2rem">

// 非推奨
<Box mt="24px" p="32px">
```

例外：
- 1pxのborderはpxで表現
- 割合を示す場合は%で表現

```scss
.example {
  border: 1px solid;  // 1pxは例外
  width: 100%;        // 割合は%
}
```

#### カラーの管理
色はCSS Variablesを使用する。  
Chakra UIの[Semantic Tokens](https://chakra-ui.com/docs/theming/colors#semantic-tokens)カラーで賄える場合は積極的に利用。  
ただし、`gray.400`のような具体的な色番号の直接指定は禁止。

```scss
.icon {
  .--valid & {
    color: var(--chakra-colors-fg-success);
  }

  .--invalid & {
    color: var(--chakra-colors-fg-error);
  }
}
```

## 参考資料
- [Chakra UI Documentation](https://www.chakra-ui.com/docs)
- [MDN Web Docs - Semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)