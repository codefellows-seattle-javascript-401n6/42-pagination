'use strict';
const express = require('express');
const router = express.Router();
const Users = require('../models/userModel.js');

router.get('/', (req, res) => {
  let skip = req.query.skip || 0;
  let limit = req.query.limit || 10;
  Users.find({})
  .skip(skip)
  .limit(limit)
  .then(user =>{
    Users.count()
    .then(total => {
      res.send({
        user: user,
        total:total,
      });
    });
  });
});
module.exports = router;
