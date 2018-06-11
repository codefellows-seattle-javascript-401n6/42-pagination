'use strict';

const TedTalks = require('../models/tedTalks.jsx');

const express = require('express');
const router = express.Router();

router.get('/TedTalks', (req, res) => {
  let index = req.query.index || 0;
  let count = req.query.count || 10;

  index = parseInt(index);
  count = parseInt(count);


  TedTalks.find({})
    .skip(index)
    .limit(count)
    .then(tedTalks => {
      TedTalks.count()
        .then(total => {
          res.send({
            tedTalks,
            total,
          });
        });
    });
});

module.exports = router;