define(['backbone'], function(Backbone) {
  var Rect = Backbone.Model.extend({
    defaults: {
      value: 2,
      x: 1,
      y: 1
    },
    urlRoot: ''
  });

  return Rect;
  
});
