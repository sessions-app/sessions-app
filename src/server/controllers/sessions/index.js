const express = require('express');
const { authMiddleware } = require('../auth/setup');
const spotifyRequest = require('../../helpers/spotifyRequest');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.render('sessions');
});

router.post('/search-tracks', authMiddleware, (req, res) =>
  spotifyRequest(req.user, 'get', '/search', {
    q: `track:${req.body.query}`,
    type: 'track',
  })
  .then((resp) => {
    const { items } = resp.data.tracks;
    const searchResults = items.map(track => ({
      name: track.name,
      id: track.id,
      artist: track.artists[0].name,
    }));

    res.send(searchResults);
  })
  .catch(() => res.send([])));

module.exports = router;
