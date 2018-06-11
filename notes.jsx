fs.readFile('/etc/passwd', function (err, data) {
    if (err) throw err;
    console.log(data);
  });

  MOVIES = MOVIES.split('\n');
  MOVIES = MOVIES.map(movie => {
    let cells = movie.split(',');
    return {
      originalId: parseInt(cells[0]),
      year: parseInt(cells[1]),
      title: cells[2],
    }
  });
  
  require('dotenv').config();
  const Movie = require('../models/movie');
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGODB_URI);
  
  MOVIES.forEach(movie => {
    Movie.create(movie);
  });   