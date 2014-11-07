define(['backbone'], function(Backbone) {
  var TileModel = Backbone.Model.extend({
    defaults: {
      value: 2,
      x: 1,
      y: 1
    },
    urlRoot: ''
  });

  return TileModel;
  
});
