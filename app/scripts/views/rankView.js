define(['backbone', 'text!../../templates/rankTpl.html'], function(Backbone, rankTpl) {
  var RankView = Backbone.View.extend({
    el: '.main',
    initialize: function() {
      console.info(212);
    },
    template: _.template(rankTpl),
    render: function() {
      this.$el.html(this.template());
    },
    events: {}
  });

  return RankView;
});
