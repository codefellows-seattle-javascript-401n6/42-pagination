'use strict';

require('dotenv').config();

const fs = require('fs');

const Players = require('../models/players');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);


Players.remove({})
  .then(() => {
    return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/profiles.json`, 'utf-8', (err, data) => {
        console.log('err', err);
        let playerData = JSON.parse(data);
        let saves = playerData.map(player => {
          player = {
            name: player.name,
            position: player.position,
            height: player.height,
            current_team: player.current_team,
            birth_date: player.birth_date,
            birth_place: player.birth_place,
            death_date: player.death_date,
            college: player.college,
            high_school: player.high_school,
            draft_team: player.draft_team,
            draft_round: player.draft_round,
            draft_position: player.draft_positon,
            draft_year: player.draft_year,
            current_salary: player.current_salary,
            hof_induction_year: player.hof_induction_year

          };
          return Players.create(player);
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
    return Players.find({});
  })
  .then(players => {
    console.log('queried:', players.length, players[0]);
  })
  .then(() => {
    console.log('disconnected');
    mongoose.disconnect();
  });
