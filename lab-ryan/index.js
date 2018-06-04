require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const songRouter = require('./routes/songs.js');

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: './public'});
});

app.get('app.js', (req, res) => {
    res.sendFile('app.js', {root: './public'});
});

app.get('/app.js.map', (req, res) => {
    res.sendFile('app.js.map', {root: './public'});
});

// const Bundler = require('parcel-bundler');
// const bundler = new Bundler('./public/index.html');
// app.use(bundler.middleware());

app.use('/api', songRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});