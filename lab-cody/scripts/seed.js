'use strict';

require('dotenv').config();

const fs = require('fs');

const Songs = require('../models/songs');
const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost/codysmusicreactapp');

Songs.remove({})
  .then(() => {
    return new Promise((resolve, reject) => {
      fs.readFile('./topSpotifySongs2017.json', 'utf-8', (err, data) => {
        console.log('err', err);
        let songData = JSON.parse(data);
        let saves = songData.map(song => {
          song = {
            id: song.id,
            name: song.name,
            artists: song.artists,
            danceability: song.danceability,
            energy: song.energy,
            key: song.key,
            loudness: song.loudness,
            mode: song.mode,
            speechiness: song.speechiness,
            acousticness: song.acousticness,
            instrumentalness: song.instrumentalness,
            liveness: song.liveness,
            valence: song.valence,
            tempo: song.tempo,
            duration_ms: song.duration_ms,
            time_signature: song.time_signature
          };
          return Song.create(song);
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
    return Songs.find({});
  })
  .then(songs => {
    console.log('queried:', songs.length, songs[0]);
  })
  .then(() => {
    console.log('disconnected');
    mongoose.disconnect();
  });
