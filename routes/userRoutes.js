'use strict';
const express = require('express');
const router = express.Router();
const Users = require('../models/userModel.js');

router.get('/', (req, res) => {
  let skip = req.query.skip || 0;
  let limit = req.query.limit || 10;

  skip = parseInt(skip);
  limit = parseInt(limit);

  Users.find({})
  .skip(skip)
  .limit(limit)
  .then(users => {
    Users.count()
    .then(total => {
      res.send({
        users,
        total,
      });
    });
  });
});
module.exports = router;
