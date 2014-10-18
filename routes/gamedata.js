var express = require('express');
var router = express.Router();

// GET game_data listening
router.get('/gamedata/:id', function(req, res, next) {
  res.send('GET game_data listening');
});

// PUT game_data listening
router.post('/gamedata/:id', function(req, res, next) {
  res.send('PUT game_data listening');
});