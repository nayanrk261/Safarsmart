const express = require('express');
const router = express.Router();
const AlertSubscription = require('../models/AlertSubscription');

// POST /api/alerts — new alert set karo
router.post('/', async (req, res) => {
  try {
    const { whatsapp, travelDate, maxPrice } = req.body;

    if (!whatsapp || !travelDate || !maxPrice) {
      return res.status(400).json({ error: 'whatsapp, travelDate, maxPrice required' });
    }

    const alert = new AlertSubscription({
      whatsapp,
      travelDate: new Date(travelDate),
      maxPrice: parseInt(maxPrice)
    });

    await alert.save();
    res.json({ message: 'Alert set successfully!', alert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/alerts — saare alerts dekho
router.get('/', async (req, res) => {
  try {
    const alerts = await AlertSubscription.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;