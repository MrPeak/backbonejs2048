// 'use strict';
define(['backbone', './views/homeView', './views/gameView', './views/rankView'], function(Backbone, HomeView, GameView, RankView) {

  var GlobalRouter = Backbone.Router.extend({
    routes: {
      '': 'game',
      // 'rank': 'rank',
      // 'home/*path': 'home',
      // 'search/:q': 'search',
      // 'search/:q/user:id': 'search',
      // default actions
      '*actions': 'defaultAction'
    },
    initialize: function() {
      this.$navItems = $('.ui.nav').find('.item');
      var homeView   = new HomeView();
      homeView.render();
    },
    game: function() {
      $('.dimmer.body').addClass('active');
      this.$navItems.removeClass('active').filter('[href="#/"]').addClass('active');
      gameView = new GameView();
      gameView.render();
    },
    // rank: function() {
    //   $('.dimmer.body').addClass('active');
    //   this.$navItems.removeClass('active').filter('[href*="rank"]').addClass('active');
    //   var rankView = new RankView();
    //   gameView.remove();
    // },
    // search: function(q, id) {
    //   console.log({
    //     q: q,
    //     id: id
    //   });
    // },
    defaultAction: function() {
      this.navigate('/', {trigger: 'true'});
    }
  });


  var initialize = function() {
    var globalRouter = new GlobalRouter();

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };

});

