# git-pr-action-release-sample

git-pr-releaseを使用したPR自動作成とリリース自動化のサンプルプロジェクト

## 概要

このプロジェクトは以下の自動化を実装しています：

- develop → staging → production の3段階デプロイフロー
- PRの自動作成・更新（git-pr-release使用）
- 本番マージ時の自動タグ付け・GitHub Release作成

## セットアップ

### 1. GitHub Secrets設定

```
GIT_PR_RELEASE_TOKEN: repo権限を持つPersonal Access Token
```

### 2. ブランチ作成

```bash
git checkout -b develop
git checkout -b staging
git checkout -b production
```

### 3. ブランチ保護ルール設定

- staging: PRレビュー必須
- production: PRレビュー必須、承認者1名以上

## 使用方法

1. featureブランチで開発
2. developにマージ → staging PR自動作成
3. stagingにマージ → production PR自動作成
4. productionにマージ → タグ・リリース自動作成

## バージョニング

形式: `YYYYMMDD.REVISION` (JST)
例: `20250702.0`, `20250702.1`
