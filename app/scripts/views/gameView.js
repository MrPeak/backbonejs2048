define(['backbone', 'text!../../templates/gameTpl.html', '../views/tileView', '../collections/tileCollection'], function(Backbone, gameTpl, TileView, TileCollection) {
  var tileCollection = new TileCollection();
  var GameView = Backbone.View.extend({
    el: '.main',
    initialize: function() {
      // bind event for document
      $(document).keyup(this.moveTile);
      this.listenTo(tileCollection, 'add', this.addOneTile);
      this.listenTo(tileCollection, 'remove', this.combineTile);
      this.listenToOnce(tileCollection, 'all', this.addAllTile);
      tileCollection.fetch();
      
    },
    events: {},
    template: _.template(gameTpl),
    render: function() {
      this.$el.html(this.template());
    },
    moveTile: function(e) {
      switch (e.which) {
        case 87:
          // 'w' key was pressed
          break;
        case 69:
          // 'a' key was pressed
          break;
        case 83:
          // 's' key was pressed
          break;
        case 68:
          // 'd' key was pressed
          break;
      }
    },
    addOneTile: function(tile) {
      console.log(1);
      var newTileView = new TileView({
        model: tile
      });
    },
    addAllTile: function() {
      tileCollection.each(this.addOneTile, this);
      setTimeout(function() {
        $('.dimmer.body').removeClass('active')
      }, 100);
    },
    combineTile: function() {}
  });
  return GameView;
});
