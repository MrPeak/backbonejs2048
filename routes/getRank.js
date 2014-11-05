// GET rank listening
var getHandle = function(req, res) {
  var type = req.params.type;
  console.log(type);
  var data = {
    0: 'gao',
    1: 'zhang',
    2: 'wang',
    3: 'zheng',
    4: 'du',
    5: 'di',
    6: 'ma',
    7: 'ou',
    8: 'fan',
    9: 'huang',
    10: 'ge',
    length: 11
  };

  res.json(data);
};

module.exports = {
  getHandle: getHandle
};
