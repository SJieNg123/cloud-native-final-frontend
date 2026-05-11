# CETS Frontend Design System

此專案的視覺語言參考根目錄 `DESIGN.md`：近黑/純白畫布、Rosso Corsa 紅作為唯一高壓重點、8px spacing ladder，以及偏 editorial 的清楚節奏。

## Theme

- Light mode 使用 `background-light.webp` 作為頁面底層背景。
- Dark mode 使用 `background-dark.webp` 作為頁面底層背景。
- 背景圖只允許出現在頁面底層，不放入卡片、表單、列表或 Modal。
- 所有介面容器使用純色/半透明 surface、hairline border 和低對比陰影。

## Tokens

主要 token 集中在 `src/styles/index.css`：

- `--ds-red`: primary CTA、active state、重要狀態點綴。
- `--ds-canvas`, `--ds-surface`, `--ds-surface-muted`: 頁面和容器層級。
- `--ds-text`, `--ds-muted`, `--ds-line`: 文字與分隔線。
- `--ds-space-*`: 4/8/16/24/32/48/64 spacing ladder。
- `--ds-radius-*`: 卡片最大 8px，按鈕和輸入 4px。

## Component Rules

- Primary action 用紅色；同一區塊盡量只保留一個 primary action。
- Cards 保持乾淨：8px radius、hairline border、無背景圖。
- Tables、forms、profile、admin、verifier views 共用全域 Ant Design token，不在頁面內重複定義顏色。
- 活動圖片只用於 event cover / detail cover，背景氣氛交給頁面底層 custom background。
- 文字不使用負 letter spacing；中文 UI 以清楚、短句、任務導向為主。
