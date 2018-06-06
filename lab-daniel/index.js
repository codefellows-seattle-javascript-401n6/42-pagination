require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nba-salaries');


app.get('/', (req, res) => {
    res.send({data: [46, 2]});
})

const Bundler = require('parcel-bundler');
const bundler = new Bundler('./public/index.html');

app.use(bundler.middleware());
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})