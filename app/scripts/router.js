// 'use strict';
define(['backbone', './views/homeView'], function(Backbone, HomeView) {

  var GlobalRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      // 'home/*path': 'home',
      'search/:q': 'search',
      'search/:q/user:id': 'search',
      // default actions
      '*actions': 'defaultAction'
    },
    home: function () {
      var homeView = new HomeView();
      homeView.render();
    },
    search: function(q, id) {
      console.log({
        q: q,
        id: id
      });
    },
    defaultAction: function() {
      console.log('Do nothing!');
    }
  });


  var initialize = function() {
    globalRouter = new GlobalRouter();

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});
