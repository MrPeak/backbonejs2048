define(['backbone', 'text!../../templates/tileTpl.html', '../models/tileModel'], function(Backbone, tileTpl, TileModel) {
  var TileView = Backbone.View.extend({
    // el: '.tile-container',
    initialize: function() {
      this.listenTo(this.model, 'change:value', this.render);
      this.listenTo(this.model, 'change', this.move);
      this.listenTo(this.model, 'destroy', this.remove);
      this.render();
    },
    template: _.template(tileTpl),
    render: function() {
      // Manually validate model
      // this.model.isValid();
      // this.$tile = $(this.template(this.model.toJSON()));
      // this.$el.append(this.$tile);
      
      this.$el.html(this.template(this.model.toJSON()));
      $('.tile-container').append(this.$el)
      return this;
    },
    move: function(model) {
      var regExp = /translate\S*/g;
      console.log(this.$el.children().get(0).className)
      this.$el.children().get(0).className.replace(regExp, 'translate-x' + this.model.get('x') + '-y' + this.model.get('y'));
      console.log(this.$el.children().get(0).className)
      
    }
  });

  return TileView;
});