const express = require('express');
const { authMiddleware } = require('../auth/setup');
const axios = require('axios');
const qs = require('querystring');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.render('sessions');
});

router.post('/search-tracks', authMiddleware, (req, res) => {
  const query = {
    q: `track:${req.body.query}`,
    type: 'track',
  };
  axios({
    method: 'get',
    url: `https://api.spotify.com/v1/search?${qs.encode(query)}`,
    headers: { Authorization: `Bearer ${req.user.payload.accessToken}` },
  })
  .then(resp => res.send(resp.data.tracks.items.map(track => ({
    name: track.name,
    id: track.id,
    artist: track.artists[0].name,
  }))))
  .catch(() => res.send([]));
});

module.exports = router;
