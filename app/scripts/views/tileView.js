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
      
      if (this.$el.children().size() !== 0) {
        this.$el.children().eq(0)
          .shape('setting', {
            duration: '200ms'
          })
          .shape('flip ' + window.flipDirection);
        
        return this; 
      }
      
      this.$el.html(this.template(this.model.toJSON()));
      
      return this;
    },
    move: function(model) {
      var regExp = /translate\S*/g;
      this.$el.children().get(0).className = this.$el.children().get(0).className.replace(regExp, 'translate-x' + model.get('x') + '-y' + model.get('y'));
      console.log('move');
    }
  });

  return TileView;
});