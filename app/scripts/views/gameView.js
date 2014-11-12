define(['backbone', 'text!../../templates/gameTpl.html', '../views/tileView', '../collections/tileCollection'], function(Backbone, gameTpl, TileView, TileCollection) {
  var tileCollection = new TileCollection();
  
  var GameView = Backbone.View.extend({
    el: '.main',
    initialize: function() {
      
      // Bind collection events
      this.listenTo(tileCollection, 'add', this.addOneTile);
      this.listenTo(tileCollection, 'invalid', this.win);
      this.listenToOnce(tileCollection, 'all', this.addAllTile);
      // Bind Dom event for 'document'
      $(document).bind('keyup', {context: this}, this.moveTile);

      tileCollection.fetch();
    },
    keyMap: {
      '87': 'up',
      '38': 'up',
      '69': 'left',
      '37': 'left',
      '83': 'down',
      '40': 'down',
      '68': 'right',
      '39': 'right'
    },
    template: _.template(gameTpl),
    render: function() {
      this.$el.html(this.template());
      return this;
    },
    addOneTile: function(tile) {
      var newTileView = new TileView({
        model: tile
      });

      return newTileView.model;
    },
    addAllTile: function() {
      tileCollection.each(this.addOneTile, this);

      setTimeout(function() {
        $('.dimmer.body').removeClass('active')
      }, 100);
    },
    moveTile: function(e) {
      var that = e.data.context;
      var direction = that.keyMap['' + e.which];

      // Excute moving-logic for this tileView
      tileCollection[direction] && tileCollection[direction]();
    },
    win: function(model) {
      window.alert('You win!');
    }
  });

  return GameView;
});
