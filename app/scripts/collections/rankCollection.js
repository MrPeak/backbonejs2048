define(['backbone'], function(Backbone) {
  var RankList = Backbone.Model.extend({
    url: '/rank'
  });

  return RankList;
});
