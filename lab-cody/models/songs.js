'use strict';

const mongoose = require('mongoose');

const SongSchema = new mongose.Schema({
    id: string,
    name: string,
    artists: string,
}

module.exports = mongoose.model('Songs', SongsSchema);
