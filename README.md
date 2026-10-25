# Riko's Portfolio 🚀

大阪公立大学工業高等専門学校（公大高専）知能情報コースに所属する **松原 里向（Riko Matsubara）** のポートフォリオサイトです。  
これまでに開発した作品、習得したスキル、経歴をまとめています。

🔗 **[ポートフォリオサイトを見る](https://nero11110.github.io/Portfolio/)**

---

## 📌 主な機能・こだわり

- **モダンなUI/UXデザイン**
  - ダークモードを標準とし、漆黒（`#0d0d0e`）をベースとした洗練されたカラーリング
  - Glassmorphism（すりガラス効果）を採用した固定ナビゲーションヘッダー
  - テーマ切り替えボタンによる **ダークモード / ライトモード** のシームレスな切替（`localStorage` に設定保存）
- **インタラクティブなアニメーション**
  - ヒーローセクションでのタイピング風テキストアニメーション
  - `IntersectionObserver` を用いたスクロール時のフェードイン（`fade-in-item`）
  - スクロール位置に応じたヘッダーナビゲーションの自動ハイライト機能
- **詳細モーダルウィンドウ**
  - 作成物カードをクリックすると詳細情報、使用技術、デモサイト・GitHubコードへのリンクをモーダル表示
- **レスポンシブ対応**
  - `clamp()` 関数や Flexbox / CSS Grid を活用し、PC・スマートフォン・タブレットの全デバイスで快適に閲覧可能

---

## 🛠 使用技術（Tech Stack）

| カテゴリ | 技術・ツール |
| --- | --- |
| **フロントエンド** | HTML5, CSS3, JavaScript (ES6+) |
| **開発環境・サービス** | VSCode, Git, GitHub, WSL (Windows Subsystem for Linux) |
| **その他所有スキル** | Python, Arduino, TinkerCad, RealVNC |

---

## 📂 プロジェクト構成

```text
.
├── index.html       # メインのHTML構造（Hero, About, Skills, Timeline, Works, Modal）
├── style.css        # スタイル定義（CSS変数、レスポンシブ、テーマ切替）
├── script.js        # 動的処理（タイピングアニメーション、モーダル、テーマ切替、Observer）
└── README.md        # プロジェクト概要
