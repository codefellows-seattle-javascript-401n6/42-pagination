const Happiness = require('../models/happiness');

const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  console.log('hitting router');
  let skip = req.query.skip || 0;
  let limit = req.query.limit || 10;

  skip = parseInt(skip);
  limit = parseInt(limit);

  Happiness.find({})
  .skip(skip)
  .limit(limit)
  .then(ratings => {
    Happiness.count()
    .then(total => {
      res.send({
      ratings,
      total,
      })
    })
  })
});

module.exports = router;