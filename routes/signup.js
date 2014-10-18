var express = require('express');
var router = express.Router();

/* POST sign up listing. */
router.post('/signup', function(req, res) {
  res.send('Do you want to sign up?');
});

module.exports = router;
