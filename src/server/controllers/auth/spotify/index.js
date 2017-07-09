const express = require('express');
const { passport, authMiddleware } = require('../config');

const router = express.Router();

router.get('/', passport.authenticate('spotify', { scope: ['user-library-modify'] }),
  () => {});

router.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/test', authMiddleware, (req, res) => {
  res.send(req.user);
});

module.exports = router;
