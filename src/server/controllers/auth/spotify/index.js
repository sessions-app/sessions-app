const express = require('express');
const { passport, authMiddleware } = require('../config');

const router = express.Router();

router.get('/', passport.authenticate('spotify'), () => {});

router.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/test', authMiddleware, (req, res) => {
  res.send('You\'re in!');
});

module.exports = router;
