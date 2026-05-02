const puppeteer = require('puppeteer');
const PriceSnapshot = require('../models/PriceSnapshot');
const AlertSubscription = require('../models/AlertSubscription');
const sendAlert = require('../config/telegram');

const scrapeRedbus = async (travelDate) => {
  console.log('🚌 Scraper starting...');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  const formattedDate = travelDate.toISOString().split('T')[0];
  const url = `https://www.redbus.in/bus-tickets/aurangabad-to-pune?fromCityName=Aurangabad&toCityName=Pune&onward=${formattedDate}&busType=Any`;

  console.log(`🔍 Opening: ${url}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 12000));
    await page.evaluate(() => window.scrollBy(0, 500));
    await new Promise(r => setTimeout(r, 2000));

    await page.screenshot({ path: 'debug-screenshot.png' });
    console.log('📸 Screenshot saved');

    const buses = await page.evaluate(() => {
      const results = [];
      const busItems = document.querySelectorAll('[class*="tupleWrapper"]');

      busItems.forEach((item) => {
        const priceEl = item.querySelector('[class*="finalFare"]');
        const operatorEl = item.querySelector('[class*="travelsName"]');
        const ratingEl = item.querySelector('[class*="rating___"]');
        const seatsEl = item.querySelector('[class*="totalSeats"]');
        const busTypeEl = item.querySelector('[class*="busType"]');

        if (operatorEl && priceEl) {
          const priceText = priceEl.innerText.replace(/[^0-9]/g, '');
          const price = parseInt(priceText);

          if (!isNaN(price) && price > 0) {
            results.push({
              operator: operatorEl.innerText.trim(),
              price: price,
              rating: ratingEl ? parseFloat(ratingEl.innerText.trim()) : null,
              seatsLeft: seatsEl ? parseInt(seatsEl.innerText.replace(/[^0-9]/g, '')) : null,
              busType: busTypeEl ? busTypeEl.innerText.trim() : null,
            });
          }
        }
      });

      return results;
    });

    console.log(`✅ Found ${buses.length} buses`);

    if (buses.length > 0) {
      const snapshots = buses.map((bus) => ({
        ...bus,
        route: 'sambhajinagar-pune',
        travelDate: travelDate,
        source: 'redbus',
      }));

      await PriceSnapshot.insertMany(snapshots);
      console.log(`💾 Saved ${buses.length} records to MongoDB`);

      // Alert check
      const lowestBus = buses.reduce((min, bus) => bus.price < min.price ? bus : min, buses[0]);
      console.log(`💰 Lowest price found: ₹${lowestBus.price} by ${lowestBus.operator}`);

      const activeAlerts = await AlertSubscription.find({
        triggered: false,
        travelDate: {
          $gte: new Date(travelDate.toDateString()),
          $lt: new Date(travelDate.getTime() + 24 * 60 * 60 * 1000)
        }
      });

      console.log(`🔔 Active alerts: ${activeAlerts.length}`);

      for (const alert of activeAlerts) {
        if (lowestBus.price <= alert.maxPrice) {
          const message = `
🚨 FareWise Price Alert!

Route: Sambhajinagar → Pune
Operator: ${lowestBus.operator}
Price: ₹${lowestBus.price}
Bus Type: ${lowestBus.busType}
Rating: ⭐ ${lowestBus.rating}
Seats Left: ${lowestBus.seatsLeft}
Travel Date: ${travelDate.toDateString()}

Book now on RedBus! 🎟️
          `;

          await sendAlert(message);

          await AlertSubscription.findByIdAndUpdate(alert._id, { triggered: true });
          console.log(`✅ Alert sent for ₹${lowestBus.price}`);
        }
      }
    } else {
      console.log('⚠️ No buses found');
    }

  } catch (err) {
    console.error('❌ Scraper error:', err.message);
    try { await page.screenshot({ path: 'error-screenshot.png' }); } catch(e) {}
  } finally {
    try {
      await browser.close();
    } catch (e) {}
  }
};

module.exports = scrapeRedbus;