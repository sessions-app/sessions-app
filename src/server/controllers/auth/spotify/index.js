const express = require('express');
const { passport, authMiddleware } = require('../setup');
const spotifyRequest = require('../../../helpers/spotifyRequest');

const router = express.Router();

router.get('/', passport.authenticate('spotify', { scope: ['user-library-modify'] }),
  () => {});

router.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/sessions');
  });

router.get('/test', authMiddleware, (req, res) => {
  spotifyRequest(req.user, 'get', '/me')
    .then(resp => res.send(resp.data))
    .catch(() => res.status(500).end());
});

module.exports = router;
