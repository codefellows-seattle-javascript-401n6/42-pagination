'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const express = require('express');
const app = express();

const songRouter = require('./routes/songs');

app.use('/songs', songRouter);

app.get('/welcome', (req, res) => {
  console.log('hi there!');
  res.send('welcome!');
});
const Bundler = require('parcel-bundler');
const bundler = new Bundler('./public/index.html');
app.use(bundler.middleware());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});
