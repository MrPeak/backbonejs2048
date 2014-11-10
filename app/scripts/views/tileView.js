define(['backbone', './models/tileModel'], function(Backbone, TileModel) {
  
  var TileView = Backbone.View.extend({
    el: '.tile-container',
    model: TileModel,
    initialize: function() {},
    template: _.template($('#tile-template').html()),
    render: function() {
      this.$el.append(this.template());
    }
  });
  
  return TileView;
  
});