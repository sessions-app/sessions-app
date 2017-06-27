const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Sessions',
    title: 'This is the home',
  });
});

module.exports = router;
