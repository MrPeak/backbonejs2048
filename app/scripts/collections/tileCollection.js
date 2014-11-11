define(['backbone', '../models/tileModel'], function(Backbone, TileModel) {
  var TileCollection = Backbone.Collection.extend({
    model: TileModel,
    url: '/gamedata',
    findBlank: function() {
      
    }
  });

  return TileCollection;
});