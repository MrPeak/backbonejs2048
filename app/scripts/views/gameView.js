define(['backbone', 'text!../../templates/gameTpl.html', '../views/tileView', '../collections/tileCollection'], function(Backbone, gameTpl, TileView, TileCollection) {
  var tileCollection = new TileCollection();
  
  var GameView = Backbone.View.extend({
    // el: '.main',
    initialize: function() {
      
      // Bind collection events
      this.listenTo(tileCollection, 'add', this.addOneTile);
      this.listenTo(tileCollection, 'invalid', this.win);
      
      // Bind Dom event for 'document'
      $(document).bind('keydown', {context: this}, this.moveTile);

      tileCollection.fetch();
    },
    keyMap: {
      '87': 'up',
      '38': 'up',
      '65': 'left',
      '37': 'left',
      '83': 'down',
      '40': 'down',
      '68': 'right',
      '39': 'right'
    },
    // events: {
    //   'keyup .tile-container': 'moveTile'
    // },
    template: _.template(gameTpl),
    render: function() {
      this.$el.html(this.template());
      
      $('.main').html(this.$el);
      
      setTimeout(function() {
        $('.dimmer.body').removeClass('active');
      }, 100);
      return this;
    },
    addOneTile: function(tile) {
      var newTileView = new TileView({
        model: tile
      });

      this.$el
        .find('.tile-container')
        .append(newTileView.render().$el.transition({
          animation : 'fade',
          duration  : '300ms'
        }));
    },
    moveTile: function(e) {
      var that = e.data.context;
      var direction = that.keyMap['' + e.which];
      window.flipDirection = that.negative(direction);
  
      // Excute moving-logic for this tileView
      if (typeof tileCollection[direction] == 'function') {
        tileCollection[direction]();
        
      }
    },
    negative: function(dir) {
      if (!dir) return false;
      if (dir === 'up') return 'down';
      if (dir === 'down') return 'up';
      if (dir === 'right') return 'left';
      if (dir === 'left') return 'right';
    },
    win: function(model) {
      window.alert('You win!');
    }
  });

  return GameView;
});
