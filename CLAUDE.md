# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language
やりとりは日本語を採用する。

## Project Overview

「ココもやり展」の哲学展示会ウェブサイトのランディングページ。ビルドツールやJavaScriptフレームワークを使用せず、シンプルなHTML/CSS構造で構成されている静的サイト。

## Project Structure

- `index.html` - ランディングページ（コンセプト、イベント情報、アクセス、問い合わせフォームを含む）
- `style.css` - レスポンシブデザインのCSS（CSS変数、clamp()、コンテナクエリを活用）
- `kokomoyariLP/` - 空のディレクトリ（用途不明）

## 開発メモ

### フォーム処理
`index.html`の問い合わせフォームには、実際のフォームハンドラーエンドポイントの設定が必要（現在は`ACTION_URL`がプレースホルダー）。

### 不足しているアセット
- `/assets/favicon.png` - 参照されているが存在しない
- OGP画像（`https://example.com/ogp.jpg`） - プレースホルダーURLの更新が必要

### デプロイ設定
OGP URLメタタグはGitHub Pagesデプロイメントパターンを参照しているが、実際のユーザー名の設定が必要。

### CSSアーキテクチャ
- CSS変数を使用した一貫性のあるスペーシングとブレークポイント
- 最小限のメディアクエリによるモバイルファーストのレスポンシブデザイン
- 各プラットフォームで最適なパフォーマンスを実現するシステムフォントスタック

## 重要事項

1. ビルドプロセスのない純粋な静的サイト
2. すべての変更は`index.html`をブラウザで直接開いてテスト可能
3. 日本語のサイトで、日本の観客をターゲットとしている
4. フォーム送信には外部処理が必要（バックエンドなし）