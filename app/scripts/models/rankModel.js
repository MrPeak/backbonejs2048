define(['backbone'], function(Backbone) {
  var Rank = Backbone.Model.extend({
    defaults: {
      rankData: [{
        name: '',
        avatar: '',
        score: ''
      }]
    },
    urlRoot: '/rank'
  });

  return Rank;
});
