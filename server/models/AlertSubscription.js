const mongoose = require('mongoose');

const alertSubscriptionSchema = new mongoose.Schema({
  whatsapp: {
    type: String,
    required: true
  },
  route: {
    type: String,
    default: 'sambhajinagar-pune'
  },
  travelDate: {
    type: Date,
    required: true
  },
  maxPrice: {
    type: Number,
    required: true
  },
  triggered: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AlertSubscription', alertSubscriptionSchema);