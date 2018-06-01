const mongoose = require('mongoose');

const HappinessSchema = new mongoose.Schema({
  country: String,
  rank: Number,
  score: Number,
});

module.exports = mongoose.model('Happiness', HappinessSchema);