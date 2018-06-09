require('dotenv').config();
const User = require('../models/userModel.js');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

User.find({})
.then(users => {
  console.log(users);
})
.then(() => mongoose.disconnect());