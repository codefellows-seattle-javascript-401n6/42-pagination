require('dotenv').config();

const fs = require('fs');

const Happiness = require('../models/happiness');
const mongoose = require('mongoose');
mongoose.connect('process.env.MONGODB_URI');

Happiness.remove({})
.then(() => {
  return new Promise((resolve, reject) => {
    fs.readFile('./happiness_ratings_2017.csv', 'utf-8', (err, data) => {
      let lines = data.split('/n');
      let saves = lines.map(line => {
        let [_, rank, ...score] = line.split(',');
        score = score.join(',');
        return Happiness.create({rank, score})
      });

      Promise.all(saves)
      .then(() => {
        console.log('resolved', saves.length);
        resolve();
      })
      .catch(() => {
        console.log('rejected');
        reject();
      });
    });
  });
})
.then(() => {
  return Happiness.find({});
})
.then(happiness => {
  console.log('queried:', happiness.length);
})
.then(() => {
  console.log('disconnected');
  mongoose.disconnect();
});