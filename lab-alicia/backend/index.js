require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const express = require('express');
const app = express();

app.use('/happiness', happinessRouter);

app.get('/', (req, res) => {
  res.send('welcome!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('http://localhost' + PORT);
});