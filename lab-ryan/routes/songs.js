const Song = require('../models/song.js');

const express = require('express');
const router = express.Router();

router.get('/songs', (req, res) => {
    console.log('get songs');
    let index = req.query.index || 0;
    let count = req.query.count || 10;

    index = parseInt(index);
    count = parseInt(count);

    Song.find({})
    .skip(index)
    .limit(count)
    .then(song => {
        console.log('songs', song.length);
        Song.count()
        .then(total => {
            res.send({
                song,
                total,
            });
        });
    });
});

module.exports = router;