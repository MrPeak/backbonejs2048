// GET game_data listening
var getHandle = function(req, res, next) {
  var arr = [{
    value: 2,
    x: 1,
    y: 1
  }, {
    value: 2,
    x: 2,
    y: 1
  }, {
    value: 11,
    x: 1,
    y: 3
  }, {
    value: 6,
    x: 1,
    y: 2
  }];

  res.json(arr);
};

// PUT game_data listening
var postHandle = function(req, res, next) {
  res.send('PUT game_data listening');
};

module.exports = {
  getHandle: getHandle,
  postHandle: postHandle
};
