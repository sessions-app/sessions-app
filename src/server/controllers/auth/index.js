const express = require('express');
const spotifyRouter = require('./spotify');

const router = express.Router();

router.use('/spotify', spotifyRouter);

module.exports = router;
