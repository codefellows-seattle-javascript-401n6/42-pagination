const mongoose = require('mongoose');

const TedTalksSchema = new mongoose.Schema({
  description: String,
  event: String,
  speaker: String,
  title: String,
  talkUrl: String,
});

module.exports = mongoose.model('TedTalks', TedTalksSchema);
