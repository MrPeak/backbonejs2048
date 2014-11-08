// GET rank listening
var getHandle = function(req, res) {

  var data = {
    type: req.query.type,
    rankData: [{
      name: 'gao',
      avatar: 'Hulk',
      score: 20000
    }, {
      name: 'gao',
      avatar: 'Hulk',
      score: 20000
    }, {
      name: 'gao',
      avatar: 'Hulk',
      score: 20000
    }, {
      name: 'gao',
      avatar: 'Hulk',
      score: 20000
    }, {
      name: 'gao',
      avatar: 'Hulk',
      score: 20000
    }, {
      name: 'gao',
      avatar: 'Hulk',
      score: 20000
    }, {
      name: 'gao',
      avatar: 'Hulk',
      score: 20000
    }, {
      name: 'gao',
      avatar: 'Hulk',
      score: 20000
    }, {
      name: 'gao',
      avatar: 'Hulk',
      score: 20000
    }, {
      name: 'gao',
      avatar: 'Hulk',
      score: 20000
    }]
  };

  res.json(data);
};

module.exports = {
  getHandle: getHandle
};
