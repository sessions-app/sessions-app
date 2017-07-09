const express = require('express');
const qs = require('querystring');

const router = express.Router();
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

router.get('/authorize', (req, res) => {
  const query = {
    client_id: clientId,
    response_type: 'code',
    scope: 'user-library-modify',
  };

  res.redirect(`https://accounts.spotify.com/authorize?${qs.encode(query)}`);
});

module.exports = router;
