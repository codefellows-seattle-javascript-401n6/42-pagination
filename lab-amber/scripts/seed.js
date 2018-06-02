'use strict';

require('dotenv').config();

const fs = require('fs');

const Honey = require('../models/honey.js');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

Honey.remove({})
  .then(() => {
    return new Promise((resolve, reject) => {
      fs.readFile('./honeyproduction.csv', 'utf-8', (err, data) => {
        let lines = data.split('\n');
        lines = lines.filter(line => {
          if (line) return line;
        });
        lines.shift();
        let saves = lines.map(line => {
          let lineArray = line.split(',');
          console.log('line array', lineArray, lineArray.length);
          if (lineArray.length === 8) {
            return Honey.create({
              state: lineArray[0],
              year: parseInt(lineArray[7]),
              totalprod: parseInt(lineArray[3]),
              priceperl: parseInt(lineArray[5]),
              prodvalue: parseInt(lineArray[6])
            });
          }
        });
        Promise.all(saves)
          .then(() => {
            console.log('resolved', saves.length);
            resolve();
          })
          .catch(err => {
            console.error('rejected', err);
            reject();
          });
      });
    });
  })
  .then(() => {
    return Honey.find({});
  })
  .then(honey => {
    console.log('queried:', honey.length);
  })
  .then(() => {
    console.log('disconnected');
    mongoose.disconnect();
  }).catch(err => {
    console.error(err);
  });