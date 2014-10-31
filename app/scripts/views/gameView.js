define(['backbone', 'text!../../templates/gameTpl.html'], function(Backbone, gameTpl) {
  var GameView = Backbone.View.extend({
    el: '.main',
    initialize: function() {
    },
    template:_.template(gameTpl),
    render: function() {
      this.$el.html(this.template());
    }
  });

  return GameView;
});
