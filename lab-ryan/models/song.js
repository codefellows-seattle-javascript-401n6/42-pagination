const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    artist: String,
    title: String,
});

module.exports = mongoose.model('Song', SongSchema);