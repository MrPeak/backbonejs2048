define(['backbone'], function(Backbone) {
  var Rank = Backbone.Model.extend({
    defaults: {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
      length: 11 
    },
    urlRoot: '/rank'
  });

  return Rank;
});
