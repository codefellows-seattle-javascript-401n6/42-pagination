'use strict';

const Players = require('../models/players');

const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  console.log('getting players');
  let skip = req.query.skip || 0;
  let limit = req.query.limit || 10;

  skip = parseInt(skip);
  limit = parseInt(limit);


  Players.find({})
    .skip(skip)
    .limit(limit)
    .then(players => {
      console.log('players', players.length);
      Players.count()
        .then(total => {
          res.send({
            players,
            total,
          });
        });
    });
});

module.exports = router;