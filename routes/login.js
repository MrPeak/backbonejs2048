/* POST login listing. */
var postHandle = function(req, res, next) {
  res.send('Do you want to log in?');
};

module.exports = postHandle;
