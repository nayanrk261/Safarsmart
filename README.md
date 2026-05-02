# 🚌 SafarSmart — Smart Bus Price Tracker

> Never overpay for bus tickets again. SafarSmart tracks bus prices on RedBus, shows price history, and sends Telegram alerts when prices drop below your budget.

## 🎯 Problem
Bus ticket prices on RedBus change dynamically — same ticket costs ₹500 on Wednesday but ₹850 on Sunday. There's no way to know when prices are lowest or get notified when a good deal appears.

## 💡 Solution
SafarSmart automatically scrapes bus prices, stores historical data, and alerts you on Telegram when your target price is available.

## ✨ Features
- 🔍 **Real-time scraping** — Fetches live prices from RedBus
- 📊 **Price history chart** — See how prices change over time
- 🏆 **Operator comparison** — Compare all operators by min/max/avg price and rating
- 🔔 **Telegram alerts** — Get notified instantly when price drops below your budget
- 💰 **Lowest fare card** — Always shows the current best deal

## 🛠️ Tech Stack
**Frontend:** React, Vite, Recharts, Axios

**Backend:** Node.js, Express.js, Puppeteer, node-cron

**Database:** MongoDB Atlas

**Notifications:** Telegram Bot API

