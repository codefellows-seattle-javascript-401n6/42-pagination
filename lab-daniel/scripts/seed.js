const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
console.log('URI', process.env.MONGODB_URI)

const Salary = require('../model/salary')