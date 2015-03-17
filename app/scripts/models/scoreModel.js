define(['backbone'], function(Backbone) {
  var ScoreModel = Backbone.Model.extend({
    defaults: {
      value: 0
    },
    initialize: function() {
        this.highestScore = window.localStorage.getItem('highest_score') || 0;
    }/*,
    validate: function(attrs, options) {
      if (attrs.number > this.highestScore) {
        return "You have make a new record!";
      }
    }*/
  });
  return ScoreModel;
});
