'use strict';

const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  position: String,
  height: String,
  current_team: String,
  birth_date: String,
  birth_place: String,
  death_date: String,
  college: String,
  high_school: String,
  draft_team: String,
  draft_round: String,
  draft_position: String,
  draft_year: String,
  current_salary: String,
  hof_induction_year: String
});

module.exports = mongoose.model('players', playerSchema);
