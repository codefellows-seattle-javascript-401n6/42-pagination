'use strict';

const mongoose = require('mongoose');

const SuperSchema = new mongose.Schema({
  names: 'string',
  powers: ['string']
});

module.exports = mongoose.model('Supers', SuperSchema);
