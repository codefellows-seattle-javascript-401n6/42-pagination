'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const honeyRouter = require('./routes/honey.js');

app.get('/', function(req, res) {
  res.sendFile('index.html', {root: './public'});
});

app.get('/app.js', function(req, res) {
  res.sendFile('app.js', {root: './public'});
});

app.get('/app.js.map', function(req, res) {
  res.sendFile('app.js.map', {root: './public'});
});

app.use('/api', honeyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening in at http://localhost:' + PORT);
});
