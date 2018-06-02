'use strict';

require('dotenv').config();

const fs = require('fs');
const Super = require('../models/super');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

Super.remove({})
  .then(() => {
    return new Promise((resolve, reject) => {
      fs.readFile('../super_hero_powers.json', 'utf-8', (err, data) => {
        let lines = data.split('\n');
        let saves = lines.map(line => {
          let [_, year, ...title] = line.split(',');
          title = title.join(',');
          return Super.create({ title, year });
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
    return Super.find({});
  })
  .then(supers => {
    console.log('queried:', supers.length);
  })
  .then(() => {
    console.log('disconnected');
    mongoose.disconnect();
  });
