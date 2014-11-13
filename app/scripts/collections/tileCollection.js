define(['backbone', '../models/tileModel'], function(Backbone, TileModel) {
  var TileCollection = Backbone.Collection.extend({
    model: TileModel,
    url: '/gamedata',
    table: (function() {
      var cells = [];
      
      for (var i = 1 ; i <= 4 ; i++ ){
        for(var j = 1 ; j <= 4 ; j++){
          cells.push({x : i , y : j });
        }
      }
      
      return cells;
    })(),
    up: function() {
      var that = this;

      this.chain()
        .sortBy(function(tile) {
          return tile.get('x'); // Ascending horizon order 
        })
        .sortBy(function(tile) {
          return tile.get('y'); // Ascending vertical order
        })
        .each(function(tile) {

          var neighborTiles = that.chain().filter(function(neighbor) {
            // Tiles in the same column that have a lower y than the current tile
            return (neighbor.get('x') == tile.get('x')) && (neighbor.get('y') < tile.get('y'));
          });

          if(neighborTiles.value().length === 0) {

            tile.set('y', 1); // Move the tile to the top position

          } else {

            var nearestNeighbor = neighborTiles.max(function(tile) {
              return tile.get('y');
            }).value();

            if(nearestNeighbor.get('value') == tile.get('value')) {
              tile.set('y', nearestNeighbor.get('y'));

              nearestNeighbor.set('value', nearestNeighbor.get('value') + 1);

              tile.destroy();

              // Update the score ...
              // score.set('value', score.get('value') + nearestNeighbor.get('value'));
            } else {
              tile.set('y', nearestNeighbor.get('y') + 1);
            }
          }

        });
      
        this.born();
    },
    left: function() {
      var that = this;

      this.chain()
        .sortBy(function(tile) {
          return tile.get('x');
        })
        .sortBy(function(tile) {
          return tile.get('y');
        })
        .each(function(tile) {

          var neighborTiles = that.chain().filter(function(neighbor) {
            return (neighbor.get('y') == tile.get('y')) && (neighbor.get('x') < tile.get('x'));
          });

          if(neighborTiles.value().length === 0) {

            tile.set('x', 1);

          } else {

            var nearestNeighbor = neighborTiles.max(function(tile) {
              return tile.get('x');
            }).value();

            if(nearestNeighbor.get('value') == tile.get('value')) {

              tile.set('x', nearestNeighbor.get('x'));
              nearestNeighbor.set('value', nearestNeighbor.get('value') + 1);
              tile.destroy();

              // score.set('value', score.get('value') + nearestNeighbor.get('value'));
            } else {
              tile.set('x', nearestNeighbor.get('x') + 1);
            }

          }

        });
        
        this.born();
    },
    down: function() {
      var that = this;

      this.chain()
        .sortBy(function(tile) {
          return tile.get('x');
        })
        .sortBy(function(tile) {
          return 4 - tile.get('y');
        })
        .each(function(tile) {

          var neighborTiles = that.chain().filter(function(neighbor) {
            return (neighbor.get('x') == tile.get('x')) && (neighbor.get('y') > tile.get('y'));
          });

          if(neighborTiles.value().length === 0) {
            tile.set('y', 4);
          } else {

            var nearestNeighbor = neighborTiles.min(function(tile) {
              return tile.get('y');
            }).value();

            if(nearestNeighbor.get('value') == tile.get('value')) {

              tile.set('y', nearestNeighbor.get('y'));
              nearestNeighbor.set('value', nearestNeighbor.get('value') + 1);
              tile.destroy();

              // Then we update the score ...
              // score.set('value', score.get('value') + nearestNeighbor.get('value'));
            } else {
              tile.set('y', nearestNeighbor.get('y') - 1);
            }
          }
        });
        
        this.born();
    },
    right: function() {
      var that = this;

      this.chain()
        .sortBy(function(tile) {
          return 4 - tile.get('x'); 
        })
        .sortBy(function(tile) {
          return tile.get('y'); 
        })
        .each(function(tile) {

          var neighborTiles = that.chain().filter(function(neighbor) {
            return (neighbor.get('y') == tile.get('y')) && (neighbor.get('x') > tile.get('x')); 
          });

          if (neighborTiles.value().length === 0) { 
            tile.set('x', 4);
          } else { // There are neighbor(s)
            
            var nearestNeighbor = neighborTiles.min(function(tile) {
              return tile.get('x');
            }).value();
            
            if (nearestNeighbor.get('value') == tile.get('value')) {
              tile.set('x', nearestNeighbor.get('x'));
              nearestNeighbor.set('value', nearestNeighbor.get('value') + 1);
              tile.destroy();

              // Then we update the score ...
              // score.set('value', score.get('value') + nearestNeighbor.get('value'));
            } else {
              tile.set('x', nearestNeighbor.get('x') - 1); 
            }

          }

        });
        
        this.born();
    },
    born: function() {
      var ocupiedCells = [];
      var blankCells   = [];
      
      this.each(function(model) {
        ocupiedCells.push({x: model.get('x'), y: model.get('y')});  
      });
      
      blankCells = _(this.table).reject(function(cell) {
        return _(ocupiedCells).findWhere(cell);
      }); 
      
      // console.log(blankCells);
      // if(_(blankCells).findWhere({x:1, y:1})) {
      //   alert("Find it!");
      // }
      
      this.add(blankCells[_.random(0, blankCells.length)]);
    }
  });

  return TileCollection;
});