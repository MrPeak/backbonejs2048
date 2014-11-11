define(['backbone', 'text!../../templates/tileTpl.html', '../models/tileModel'], function(Backbone, tileTpl, TileModel) {
  var TileView = Backbone.View.extend({
    el: '.tile-container',
    initialize: function() {
      this.render();
    },
    defaults: {
      value: 1,
      x: 1,
      y: 2
    },
    template: _.template(tileTpl),
    render: function() {
      this.$el.append(this.template(this.model.toJSON()));
      return this;
    }
  });
  return TileView;
});