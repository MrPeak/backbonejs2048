var express = require('express');
var router = express.Router();

/* post login listing. */
router.post('/login/:id', function(req, res) {
  res.send('Do you want to log out?');
});

module.exports = router;
