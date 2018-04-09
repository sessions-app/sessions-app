const express = require('express');

const getDbCheck = require('./getDbCheck');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'HubSpot Contact',
  });
});

router.get('/db-check', getDbCheck);

module.exports = router;
