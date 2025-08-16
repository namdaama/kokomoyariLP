# デプロイ手順

このサイトはGitHub Pagesを使用してホスティングされています。

## GitHub Pages URL
https://namdaama.github.io/kokomoyariLP/

## 初回セットアップ

### 1. GitHub Pagesの有効化
1. GitHubリポジトリの **Settings** タブを開く
2. 左メニューから **Pages** を選択
3. **Source** セクションで以下を設定：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. **Save** をクリック

### 2. デプロイの確認
- 設定後、数分待つと自動的にサイトが公開される
- Actions タブでデプロイの進行状況を確認可能
- 公開URL: https://namdaama.github.io/kokomoyariLP/

## 更新方法

mainブランチに変更をプッシュすると自動的にデプロイされます：

```bash
git add .
git commit -m "サイトの更新"
git push origin main
```

## 必要なアセット

以下のファイルを準備してassetsフォルダに配置してください：

- `assets/favicon.png` - ファビコン画像（32x32px推奨）
- `assets/ogp.jpg` - OGP画像（1200x630px推奨）

## トラブルシューティング

### サイトが表示されない場合
1. Settings > Pages でGitHub Pagesが有効になっているか確認
2. Actions タブでデプロイが成功しているか確認
3. ブラウザのキャッシュをクリア
4. https://namdaama.github.io/kokomoyariLP/ にアクセス

### 画像が表示されない場合
- パスが相対パス（`assets/`）になっているか確認
- ファイル名の大文字小文字が正しいか確認
- 実際にファイルがリポジトリにコミットされているか確認

## カスタムドメイン（オプション）

独自ドメインを使用する場合：
1. Settings > Pages > Custom domain にドメインを入力
2. リポジトリのルートに`CNAME`ファイルを作成
3. DNSレコードを設定

## ローカルテスト

デプロイ前にローカルで確認：
```bash
# Python 3の場合
python -m http.server 8000

# Node.jsの場合
npx serve .
```

ブラウザで http://localhost:8000 にアクセス