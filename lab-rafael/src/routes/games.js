const express = require('express');
const router = express.Router();
const Game = require('../models/game');

router.get('/api/games', (req, res) => {
  console.log('getting games');
  let skip = req.query.skip || 0;
  let limit = req.query.limit || 25;

  skip = parseInt(skip);
  limit = parseInt(limit);

  Game.find({})
    .skip(skip)
    .limit(limit)
    .then(games => {
      console.log('games', games.length);
      Game.count()
        .then(total => {
          console.log(total);
          return res.send({ games, total });
        })
    })
})

module.exports = router;
