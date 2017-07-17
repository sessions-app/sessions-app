const express = require('express');

const getDbCheck = require('./getDbCheck');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Sessions',
    loggedIn: req.isAuthenticated(),
  });
});

router.get('/db-check', getDbCheck);

module.exports = router;
