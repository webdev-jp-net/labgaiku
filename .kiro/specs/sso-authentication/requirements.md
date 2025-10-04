# Requirements Document

## Introduction

このドキュメントは、TAMSAN Lab「Labが行く」プロジェクトにおけるSSO（シングルサインオン）認証機能の要件を定義します。Google OAuthとGitHub OAuthを使用した認証システムを実装し、認証されたユーザーのみがインタビュー記事にアクセスできるようにします。

技術スタックとして、AstroフレームワークとLucia Authライブラリを使用します。Lucia AuthはAstroの公式ドキュメントで推奨されており、OAuth 2.0に対応した軽量な認証ライブラリです。

## Requirements

### Requirement 1: OAuth認証プロバイダーの統合

**User Story:** TAMSAN Labメンバーとして、GoogleまたはGitHubアカウントを使用してログインしたい。これにより、新しいパスワードを作成・管理する必要がなくなる。

#### Acceptance Criteria

1. WHEN ユーザーがログインページにアクセスする THEN システムは Google と GitHub のログインオプションを表示する SHALL
2. WHEN ユーザーが Google ログインボタンをクリックする THEN システムは Google OAuth 2.0 認証フローを開始する SHALL
3. WHEN ユーザーが GitHub ログインボタンをクリックする THEN システムは GitHub OAuth 2.0 認証フローを開始する SHALL
4. WHEN OAuth プロバイダーが認証を承認する THEN システムはユーザー情報（ID、名前、メールアドレス、プロフィール画像）を取得する SHALL
5. WHEN OAuth 認証が完了する THEN システムはユーザーをコールバックURLにリダイレクトする SHALL

### Requirement 2: セッション管理

**User Story:** 認証されたユーザーとして、ログイン状態を維持したい。これにより、ページ遷移のたびにログインし直す必要がなくなる。

#### Acceptance Criteria

1. WHEN ユーザーが正常に認証される THEN システムは安全なセッションを作成する SHALL
2. WHEN セッションが作成される THEN システムは HTTP-only Cookie にセッション ID を保存する SHALL
3. WHEN ユーザーがページにアクセスする THEN システムはセッション Cookie を検証する SHALL
4. WHEN セッションが有効である THEN システムはユーザー情報をページコンテキストに提供する SHALL
5. WHEN セッションが期限切れまたは無効である THEN システムはユーザーをログインページにリダイレクトする SHALL
6. WHEN ユーザーがログアウトする THEN システムはセッションを無効化し Cookie を削除する SHALL

### Requirement 3: 認証が必要なページの保護

**User Story:** サイト管理者として、認証されていないユーザーがインタビュー記事にアクセスできないようにしたい。これにより、コンテンツへのアクセスを制御できる。

#### Acceptance Criteria

1. WHEN 未認証ユーザーが `/articles` にアクセスする THEN システムはユーザーをログインページにリダイレクトする SHALL
2. WHEN 未認証ユーザーが `/articles/[slug]` にアクセスする THEN システムはユーザーをログインページにリダイレクトする SHALL
3. WHEN リダイレクトが発生する THEN システムは元のURLをコールバックURLとして保持する SHALL
4. WHEN 認証後にコールバックURLが存在する THEN システムはユーザーを元のURLにリダイレクトする SHALL
5. WHEN 認証済みユーザーが保護されたページにアクセスする THEN システムはコンテンツを表示する SHALL

### Requirement 4: ユーザー情報の表示

**User Story:** ログインしたユーザーとして、自分のアカウント情報を確認したい。これにより、正しいアカウントでログインしていることを確認できる。

#### Acceptance Criteria

1. WHEN 認証済みユーザーがページを表示する THEN システムはヘッダーにユーザー名を表示する SHALL
2. WHEN ユーザー情報にプロフィール画像が含まれる THEN システムはヘッダーにプロフィール画像を表示する SHALL
3. WHEN ユーザー情報にメールアドレスが含まれる THEN システムはヘッダーにメールアドレスを表示する SHALL
4. WHEN 未認証ユーザーがページを表示する THEN システムはヘッダーに「ログイン」リンクを表示する SHALL

### Requirement 5: エラーハンドリングとユーザーフィードバック

**User Story:** ユーザーとして、認証プロセス中にエラーが発生した場合、何が問題なのかを理解したい。これにより、適切な対応を取ることができる。

#### Acceptance Criteria

1. WHEN OAuth 認証が失敗する THEN システムはユーザーにわかりやすいエラーメッセージを表示する SHALL
2. WHEN ネットワークエラーが発生する THEN システムは「接続に問題が発生しました」というメッセージを表示する SHALL
3. WHEN OAuth プロバイダーがアクセスを拒否する THEN システムは「認証がキャンセルされました」というメッセージを表示する SHALL
4. WHEN ログインが成功する THEN システムは成功メッセージを表示する SHALL
5. WHEN ログアウトが成功する THEN システムは成功メッセージを表示する SHALL

### Requirement 6: セキュリティ要件

**User Story:** サイト管理者として、認証システムが安全であることを確認したい。これにより、ユーザーデータを保護できる。

#### Acceptance Criteria

1. WHEN セッション Cookie を設定する THEN システムは `HttpOnly` フラグを有効にする SHALL
2. WHEN セッション Cookie を設定する THEN システムは `Secure` フラグを有効にする（本番環境） SHALL
3. WHEN セッション Cookie を設定する THEN システムは `SameSite=Lax` を設定する SHALL
4. WHEN OAuth コールバックを処理する THEN システムは state パラメータを検証する SHALL
5. WHEN セッションを作成する THEN システムはランダムで推測不可能なセッション ID を生成する SHALL
6. WHEN 環境変数を使用する THEN システムは OAuth クライアントシークレットを安全に保存する SHALL

### Requirement 7: データベース統合

**User Story:** システム管理者として、ユーザー情報とセッション情報を永続化したい。これにより、サーバー再起動後もセッションを維持できる。

#### Acceptance Criteria

1. WHEN 新しいユーザーが初めてログインする THEN システムはユーザー情報をデータベースに保存する SHALL
2. WHEN 既存ユーザーがログインする THEN システムはユーザー情報を更新する SHALL
3. WHEN セッションが作成される THEN システムはセッション情報をデータベースに保存する SHALL
4. WHEN セッションが検証される THEN システムはデータベースからセッション情報を取得する SHALL
5. WHEN セッションが期限切れになる THEN システムはデータベースから古いセッションを削除する SHALL
6. IF データベース接続が失敗する THEN システムは適切なエラーメッセージを表示する SHALL

### Requirement 8: 開発環境とデプロイ

**User Story:** 開発者として、ローカル環境と本番環境の両方で認証システムをテストしたい。これにより、デプロイ前に問題を発見できる。

#### Acceptance Criteria

1. WHEN 開発環境で実行する THEN システムは `.env` ファイルから環境変数を読み込む SHALL
2. WHEN 本番環境にデプロイする THEN システムは Vercel 環境変数から設定を読み込む SHALL
3. WHEN OAuth リダイレクト URI を設定する THEN システムは環境に応じた URL を使用する SHALL
4. WHEN 必須の環境変数が不足している THEN システムは起動時にエラーを表示する SHALL
5. WHEN データベース接続文字列が設定される THEN システムは適切なデータベースに接続する SHALL
