define(['backbone', '../models/rect'], function(Backbone, Rect) {
  var Rects = Backbone.Collection.extend({
    model: Rect,
    url: '/gamedata'
  });

  return Rects;
});