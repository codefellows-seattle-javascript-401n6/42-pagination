'use strict';

const mongoose = require('mongoose');

const HoneySchema = new mongoose.Schema({
  state: String,
  year: Number,
  totalprod: Number,
  priceperl: Number,
  prodvalue: Number
});

module.exports = mongoose.model('Honey', HoneySchema);

