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

      // Render scores
      $('#current_score').text(0);
      $('#highest_score').text(localStorage.getItem('highest_score') || 0);

      // Bind unload event
      window.onbeforeunload = function() {
        // debugger;
        var currentScore = parseInt($('#current_score').text());
        var hightestScore = parseInt($('#highest_score').text());

        window.localStorage.setItem('highest_score', currentScore > hightestScore ? currentScore : hightestScore);

        return 'Do you want to leave this page?';
      }
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

