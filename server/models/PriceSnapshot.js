const mongoose = require('mongoose');

const priceSnapshotSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true
  },
  operator: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  busType: {
    type: String
  },
  rating: {
    type: Number
  },
  seatsLeft: {
    type: Number
  },
  travelDate: {
    type: Date,
    required: true
  },
  scrapedAt: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    enum: ['redbus', 'abhibus'],
    required: true
  }
});

module.exports = mongoose.model('PriceSnapshot', priceSnapshotSchema);