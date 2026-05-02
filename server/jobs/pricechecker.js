const cron = require('node-cron');

const startPriceChecker = () => {
  if (process.env.RENDER === 'true') {
    console.log('⏰ Cron job disabled on Render');
    return;
  }
  console.log('⏰ Cron job started — runs every 4 hours');
  cron.schedule('0 */4 * * *', async () => {
    const scrapeRedbus = require('../scrapers/redbus');
    const date = new Date();
    date.setDate(date.getDate() + 7);
    await scrapeRedbus(date);
  });
};

module.exports = startPriceChecker;