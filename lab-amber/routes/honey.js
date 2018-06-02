'use strict';

const Honey = require('../models/honey.js');

const express = require('express');
const router = express.Router();

router.get('/honey', (req, res) => {
  let index = req.query.index || 0;
  let count = req.query.count || 10;

  index = parseInt(index);
  count = parseInt(count);


  Honey.find({})
    .skip(index)
    .limit(count)
    .then(honey => {
      Honey.count()
        .then(total => {
          res.send({
            honey,
            total,
          });
        });
    });
});

module.exports = router;
