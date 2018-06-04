require('dotenv').config();

const fs = require('fs');

const Song = require('../models/song.js');

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

Song.remove({})
.then(() => {
    return new Promise((resolve, reject) => {
        fs.readFile('./songdata.csv', 'utf-8', (err, data) => {
           let lines = data.split('\n');
           lines = lines.filter(line => {
               if(line) return line;
           });
           lines.shift();
           let saves = lines.map(line => {
               let lineArray = line.split(',');
                if(lineArray.length === 8){
                    return Song.create({
                        state: lineArray[0],
                       //other data to render 
                    });
                }
           });

           Promise.all(saves)
           .then(() => {
               console.log('resolved', saves.length);
               resolve();
           })
           .catch(() => {
               console.log('rejected', err);
               reject();
           });
        });
    });
})
.then(() => {
    return Song.find({});
})
.then(songs => {
    console.log('queried: ', songs.length);
})
.then(() => {
    console.log('disconnected');
    mongoose.disconnect();
})
.catch(err => {
    console.error(err);
});