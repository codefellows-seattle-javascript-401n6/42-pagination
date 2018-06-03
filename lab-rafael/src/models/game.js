'use strict';
const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  userId: { type: Number, required: true },
  gameTitle: { type: String, required: true },
  behaviorName: { type: String, required: true },
  value: { type: Number, required: true }
});

module.exports = mongoose.model('Game', gameSchema);
