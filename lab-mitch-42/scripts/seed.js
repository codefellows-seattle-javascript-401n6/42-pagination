// require('dotenv').config();

// const fs = require('fs');
// const csv = require('csv');
// var obj = csv();


// function MyCSV(description, event, speaker, title, talkUrl) {
//     this.description = description;
//     this.event = event;
//     this.speaker = speaker;
//     this.title = title;
//     this.talkUrl = talkUrl;
// }

// const MyData = [];

// obj.from.path('../ted_main.csv').to.array(function(data) {
//     for (var index = 1; index < data.length; index++) {
//         MyData.push(new MyCSV(data[index][3], data[index][6], data[index][14], data[index][15]));
//     }
//     console.log(myData);
// })




const TedTalks = require('../models/tedTalks.jsx');
const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost/401-lab-42-ted-talks');
TedTalks.remove({})
.then(() => {
    return new Promise((resolve, reject) => {
        fs.readFile(`../ted_main.csv`, 'utf-8', (err, data) => {
            if (err) {
                console.log('err', err)
            };
            let lines = data.split('\n');
            let talkData = lines.map(line => {
                let cells = line.split(',');
                return TedTalks.create({
                    description: cells[1],
                    event: cells[3],
                    speaker: cells[6],
                    title: cells[14],
                    talkUrl: cells[15],
                })
            });
            Promise.all(talkData)
            .then(() => {
                console.log('resolved', talkData.length);
                resolve();
            })
            .catch((err) => {
                console.log('rejected', err);
                reject();
            });
        });
    });
})
.then(() => {
    return TedTalks.find({});
})
.then(TedTalks => {
    console.log('queried:', TedTalks.length)
})
.then(() => {
    console.log('disconnected');
    mongoose.disconnect();
});
