'use strict';

require('dotenv').config();
const app = require('express')();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const fs = require('fs');
const gameRouter = require('./src/routes/games');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const MONGODB_URI = process.env.MONGODB_URI;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use('/', gameRouter);
const server = (module.exports = {});

server.isOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if (server.isOn) {
      return reject(new Error('Error. Server already running'));
    }

    server.http = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
    mongoose.connect(MONGODB_URI);
    server.isOn = true;

    return resolve(server);
  })
}

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) {
      return reject(new Error('Error. Server already stopped'));
    }

    server.http.close(() => {
      server.isOn = false;
      return resolve();
    })
  })
}
