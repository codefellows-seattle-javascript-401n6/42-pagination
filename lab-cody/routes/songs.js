'use strict';
const Songs = require('../models/songs');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('getting songs');
  let skip = req.query.skip || 0;
  let limit = req.query.limit || 10;

  skip = parseInt(skip);
  limit = parseInt(limit);

  Songs.find({})
    .skip(skip)
    .limit(limit)
    .then(songs => {
      console.log('songs', songs.length);
      Songs.count().then(total => {
        res.send({
          songs,
          total
        });
      });
    });
});

module.exports = router;
