require('dotenv').config();
const fs = require('fs');
const Game = require('../models/game');
const mongoose = require('mongoose');
const csv = require('fast-csv');

mongoose.connect(process.env.MONGODB_URI);

let seed = () => {
  let stream = fs.createReadStream('/Users/rafael/codefellows/401/lab-assignments/42-pagination/lab-rafael/src/scripts/steam-data.csv');

  Game.remove({})
    .then(() => {
      let csvStream = csv()
        .on('data', data => {
          let game = new Game({
            userId: parseInt(data[0]),
            gameTitle: data[1],
            behaviorName: data[2],
            value: parseInt(data[3])
          });

          console.log('game', game);

          Game.create(game)
            .then(game => console.log('game saved', game))
            .catch(err => console.log(err));

        })
        .on('end', () => {
          console.log('Successfully uploaded games');
        })

        stream.pipe(csvStream);
    })
    .then(() => {
      console.log('disconnected');
      mongoose.disconnect();
    })
    .catch(err => console.log(err));
};

seed();
