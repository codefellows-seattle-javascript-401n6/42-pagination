require('dotenv').config();

const fs = require('fs');

const Happiness = require('../models/happiness');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

Happiness.remove({})
.then(() => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/data.csv`, 'utf-8', (err, data) => {
      if (err) {
        console.log('err', err)
      };
      let lines = data.split('\n');
      let saves = lines.map(line => {
        let [country, rank, score] = line.split(',');
        score = Math.floor(score*100)/100;
        console.log(country, rank, score);
        return Happiness.create({country, rank, score})
      });

      Promise.all(saves)
      .then(() => {
        console.log('resolved', saves.length);
        resolve();
      })
      .catch((err) => {
        console.log('rejected', err);
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