var express = require('express');
var router = express.Router();

/* POST login listing. */
router.post('/login/:id', function(req, res) {
  res.send('Do you want to log in?');
});

module.exports = router;
