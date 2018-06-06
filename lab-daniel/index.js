require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)

app.get('/', (req, res) => {
    res.send({data: [46, 2]});
})
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})