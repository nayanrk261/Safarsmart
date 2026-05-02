const express = require('express');
const router = express.Router();
const PriceSnapshot = require('../models/PriceSnapshot');

// GET /api/prices — saare prices
router.get('/', async (req, res) => {
  try {
    const prices = await PriceSnapshot.find({ route: 'sambhajinagar-pune' })
      .sort({ scrapedAt: -1 })
      .limit(100);
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/prices/lowest — sabse sasta ticket
router.get('/lowest', async (req, res) => {
  try {
    const lowest = await PriceSnapshot.findOne({ route: 'sambhajinagar-pune' })
      .sort({ price: 1 });
    res.json(lowest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/prices/history — har scrape ka minimum price
router.get('/history', async (req, res) => {
  try {
    const history = await PriceSnapshot.aggregate([
      { $match: { route: 'sambhajinagar-pune' } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d %H:00', date: '$scrapedAt' } }
          },
          minPrice: { $min: '$price' },
          avgPrice: { $avg: '$price' },
          scrapedAt: { $first: '$scrapedAt' }
        }
      },
      { $sort: { scrapedAt: 1 } }
    ]);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/prices/operators — operator wise comparison
router.get('/operators', async (req, res) => {
  try {
    const operators = await PriceSnapshot.aggregate([
      { $match: { route: 'sambhajinagar-pune' } },
      {
        $group: {
          _id: '$operator',
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          avgPrice: { $avg: '$price' },
          avgRating: { $avg: '$rating' },
          busType: { $first: '$busType' }
        }
      },
      { $sort: { minPrice: 1 } }
    ]);
    res.json(operators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Manual trigger — GET /api/prices/scrape
router.get('/scrape', async (req, res) => {
  try {
    if (process.env.RENDER === 'true') {
      return res.json({ message: 'Scraping not available on cloud — run locally' });
    }
    const scrapeRedbus = require('../scrapers/redbus');
    const travelDate = new Date();
    travelDate.setDate(travelDate.getDate() + 7);
    res.json({ message: 'Scraping started...' });
    await scrapeRedbus(travelDate);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;