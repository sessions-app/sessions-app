const express = require('express');

const getDbCheck = require('./getDbCheck');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Sessions',
    title: 'This is the home',
  });
});

router.get('/db-check', getDbCheck);

module.exports = router;