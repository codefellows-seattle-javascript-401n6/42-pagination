const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
    name: String,
    team: String,
    salary: Number
});

module.exports = mongoose.model('Salary', SalarySchema);