# スタイリング方針

## 概要

このドキュメントは、スタイリングに関する実装方針と参照先をまとめたものです。

## 技術スタック（スタイリング関連）

### 使用技術

- **SCSS Modules**: ページ／コンポーネント単位のスタイリング
- **グローバルSCSS**: `src/styles/index.scss`および`_variable`配下

## スタイリング哲学

### 基本方針

- **非ユーティリティファースト**: 意味のあるクラス名を使用
- **セマンティクス志向**: コンポーネントの役割を表すクラス名
- **CSS Modules**: スコープ化されたCSS（BEM命名不要）
- **SCSS**: ネストや変数を活用した保守性の高いスタイル
- **モジュラー設計**: コンポーネント単位でスタイルを管理

### DRY原則と共通スタイル

- 共通スタイルは`src/styles/_variable`やmixinで一元管理
- 同じスタイル定義の重複を排除

### セマンティックスタイリング

- 装飾を表現した命名を避け、用途や意味を基準とした命名
- ユーティリティファースト設計禁止（スタイルの羅列より意味的な抽象化を優先）
- BEM命名禁止（CSS Modulesでスコープ分離済み）
- クラス名は[dictionary](../../operation/dictionary.md#css-クラス名)準拠

## 利用可能なリソース

- 開発用ネーミング辞書: `../../operation/dictionary.md`
- UI/UX表記規約: `../../operation/naming-ui-ux.md`
- グローバル変数・mixin: `src/styles/_variable/`

## レスポンシブ対応

PC向けワイドスクリーンレイアウトのみ対象とする。タブレット・スマートフォン向けレイアウトは現状考慮しない。

## 実装プロセス

### 基本実装（必須）

- セマンティックなHTML構造の構築
- データフローと状態管理の実装
- SCSS Modulesでのレイアウト・スペーシング調整（必要に応じて`_parts`で管理）
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
// 例: Sample.module.scss
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .heading {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .body {
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
  }
}
```

#### 単位の使用

**原則：remを基準とした相対値指定**

SCSSでの実装：

- `rem`関数を使用してpx値をremに変換

```scss
@use '@/styles/_variable' as *;
.example {
  margin: rem(16); // 16px → 1rem
  padding: rem(24); // 24px → 1.5rem
}
```

TSXでの実装：

- pxをそのまま使わず、必ずremに変換して指定

例外：

- 1pxのborderはpxで表現
- 割合を示す場合は % で表現

#### カラーの管理

色はCSS Variablesを使用する。既存の `src/styles/_variable/_semantic.scss` 等で定義された変数を優先。

## 参考資料

- [Next.js CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
- [MDN Web Docs - Semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
