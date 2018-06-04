'use strict';

require('dotenv').config();

const fs = require('fs');
const Songs = require('../models/songs');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

Songs.remove({})
  .then(() => {
    return new Promise((resolve, reject) => {
      fs.readFile('../topSpotifySongs2017.json', 'utf-8', (err, data) => {
        return Songs.create({ names, powers });
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
  })
  .then(() => {
    return Songs.find({});
  })
  .then(songs => {
    console.log('queried:', songs.length);
  })
  .then(() => {
    console.log('disconnected');
    mongoose.disconnect();
  });
