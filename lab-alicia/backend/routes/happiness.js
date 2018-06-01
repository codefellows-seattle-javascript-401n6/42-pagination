const express = require('express');
const Router = new express.Router();
const Happiness = require('../models/happiness');

Router.get('/', (req, res) => {
  let skip = req.query.skip || 0;
  let limit = req.query.limit || 10;

  Happiness.find({})
  .skip(skip)
  .limit(limit)
  .then(happiness => {
    Happiness.count()
    .then(total => {
      res.send({
      ratings: ratings,
      total: total,
      })
    })
  })
});

module.exports = Router;