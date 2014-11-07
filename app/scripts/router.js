// 'use strict';
define(['backbone', './views/homeView', './views/gameView', './views/rankView'], function(Backbone, HomeView, GameView, RankView) {

  var GlobalRouter = Backbone.Router.extend({
    routes: {
      '': 'game',
      'rank': 'rank',
      // 'home/*path': 'home',
      // 'search/:q': 'search',
      // 'search/:q/user:id': 'search',
      // default actions
      '*actions': 'defaultAction'
    },
    initialize: function() {
      this.$navItems = $('.ui.nav').find('.item');

      var homeView = new HomeView();
      homeView.render();
    },
    game: function() {
      this.$navItems.removeClass('active').filter('[href="#/"]').addClass('active');
      var gameView = new GameView();
      gameView.render();
    },
    rank: function() {
      this.$navItems.removeClass('active').filter('[href*="rank"]').addClass('active');
      var rankView = new RankView();
    },
    // search: function(q, id) {
    //   console.log({
    //     q: q,
    //     id: id
    //   });
    // },
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
