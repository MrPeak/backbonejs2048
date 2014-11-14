define(['backbone', 'text!../../templates/tileTpl.html', '../models/tileModel'], function(Backbone, tileTpl, TileModel) {
  var TileView = Backbone.View.extend({
    // el: '.tile-container',
    initialize: function() {
      this.time = _.now();
      this.listenTo(this.model, 'change:value', function(model) {
        console.log('model ' + model.cid + '\'s value changed');
        console.error('value: ' + model.get('value') + '  time: ' + (new Date).getTime());
        this.render();
      });
      this.listenTo(this.model, 'change:x', this.move);
      this.listenTo(this.model, 'change:y', this.move);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    template: _.template(tileTpl),
    render: function() {
      
      // Manually validate model
      // this.model.isValid();
      
      if (this.$el.children().length !== 0) {
        this.$el.children()
          .shape('setting', {
            duration: '150ms'
          })
          .shape('flip ' + window.flipDirection);
          // console.info('flip ' + window.flipDirection);
        
      } else {
        
        this.$el.html(this.template(this.model.toJSON()));
        
      } 
      return this;
    },
    move: function(model) {
      var regExp = /translate\S*/g;
      this.$el.children().get(0).className = this.$el.children().get(0).className.replace(regExp, 'translate-x' + model.get('x') + '-y' + model.get('y'));
    }
  });

  return TileView;
});