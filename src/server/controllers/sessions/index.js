const express = require('express');
const { authMiddleware } = require('../auth/setup');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.render('sessions');
});

module.exports = router;
