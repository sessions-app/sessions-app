const express = require('express');
const spotifyRequest = require('../../helpers/spotifyRequest');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('sessions');
});


module.exports = router;
