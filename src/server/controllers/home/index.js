const express = require('express');

const getDbCheck = require('./getDbCheck');

const router = express.Router();

router.get('/', (req, res) => {
  const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:8082/assets' : '';

  res.render('home', {
    bundlePath: `${prefix}/js/hello.js`,
    stylePath: `${prefix}/css/styling.css`,
    pageTitle: 'Sessions',
    title: 'This is the home',
  });
});

router.get('/db-check', getDbCheck);

module.exports = router;
