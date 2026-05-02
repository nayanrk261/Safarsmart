const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

const sendAlert = async (message) => {
  try {
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
    console.log('✅ Telegram alert sent!');
  } catch (err) {
    console.error('❌ Telegram error:', err.message);
  }
};

module.exports = sendAlert;