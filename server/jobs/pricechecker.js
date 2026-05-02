const cron = require('node-cron');
const scrapeRedbus = require('../scrapers/redbus');

const startPriceChecker = () => {
  console.log('⏰ Cron job started — runs every 4 hours');

  // Har 4 ghante mein chalega — 0 0,4,8,12,16,20 * * *
  cron.schedule('0 */4 * * *', async () => {
    console.log(`🔄 Running scheduled scrape at ${new Date().toLocaleString()}`);

    // Agle 7 din ke liye scrape karo
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      await scrapeRedbus(date);
    }
  });
};

module.exports = startPriceChecker;