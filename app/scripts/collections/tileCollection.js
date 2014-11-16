define(['backbone', '../models/tileModel'], function(Backbone, TileModel) {
  var TileCollection = Backbone.Collection.extend({
    model: TileModel,
    url: '/gamedata',
    record: [],
    table: (function() {
      var cells = [];

      for(var i = 1; i <= 4; i++) {
        for(var j = 1; j <= 4; j++) {
          cells.push({
            x: i,
            y: j
          });
        }
      }

      return cells;
    })(),
    up: function() {
      var that = this;
      var dirty = false;

      // Listen to collection's change event, 
      // for determing if app to produce a new tile or not.
      that.on('change', function() {
        dirty = true;
      });

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
            return(neighbor.get('x') == tile.get('x')) && (neighbor.get('y') < tile.get('y'));
          });

          if(neighborTiles.value().length == 0) {

            tile.set('y', 1); // Move the tile to the top position

          }
          else {

            var nearestNeighbor = neighborTiles.max(function(tile) {
              return tile.get('y');
            }).value();

            if(nearestNeighbor.get('value') == tile.get('value')) {

              if(_.contains(that.record, nearestNeighbor.cid)) {
                tile.set('y', nearestNeighbor.get('y') + 1);
                return;
              }

              tile.set('y', nearestNeighbor.get('y'));

              nearestNeighbor.set('value', nearestNeighbor.get('value') + 1);

              that.record.push(nearestNeighbor.cid);

              tile.destroy();


              // Update the score ...
              // score.set('value', score.get('value') + nearestNeighbor.get('value'));
            }
            else {
              tile.set('y', nearestNeighbor.get('y') + 1);
            }
          }

        });

      that.record = [];
      if(dirty) this.born();

      this.off('change');
    },
    left: function() {
      var that = this;
      var dirty = false;

      // Listen to collection's change event, 
      // for determing if app to produce a new tile or not.
      that.on('change', function() {
        dirty = true;
      });

      this.chain()
        .sortBy(function(tile) {
          return tile.get('x');
        })
        .sortBy(function(tile) {
          return tile.get('y');
        })
        .each(function(tile) {
          var neighborTiles = that.chain().filter(function(neighbor) {
            return(neighbor.get('y') == tile.get('y')) && (neighbor.get('x') < tile.get('x'));
          });

          // console.log(_.intersection(neighborTiles, that.record));
          if(neighborTiles.value().length == 0) {

            tile.set('x', 1);

          }
          else {

            var nearestNeighbor = neighborTiles.max(function(tile) {
              return tile.get('x');
            }).value();

            if(nearestNeighbor.get('value') == tile.get('value')) {

              if(_.contains(that.record, nearestNeighbor.cid)) {
                tile.set('x', (nearestNeighbor.get('x') + 1));
                return;
              }

              tile.set('x', nearestNeighbor.get('x'));

              nearestNeighbor.set('value', nearestNeighbor.get('value') + 1);

              that.record.push(nearestNeighbor.cid);
              tile.destroy();


              // score.set('value', score.get('value') + nearestNeighbor.get('value'));
            }
            else {
              tile.set('x', (nearestNeighbor.get('x') + 1));
            }

          }

        });

      // Emptify records
      this.record = [];

      if(dirty) this.born();

      this.off('change');
    },
    down: function() {
      var that = this;
      var dirty = false;

      // Listen to collection's change event, 
      // for determing if app to produce a new tile or not.
      that.on('change', function() {
        dirty = true;
      });

      this.chain()
        .sortBy(function(tile) {
          return tile.get('x');
        })
        .sortBy(function(tile) {
          return 4 - tile.get('y');
        })
        .each(function(tile) {
          var neighborTiles = that.chain().filter(function(neighbor) {
            return(neighbor.get('x') == tile.get('x')) && (neighbor.get('y') > tile.get('y'));
          });

          if(neighborTiles.value().length == 0) {
            tile.set('y', 4);
          }
          else {

            var nearestNeighbor = neighborTiles.min(function(tile) {
              return tile.get('y');
            }).value();

            if(nearestNeighbor.get('value') == tile.get('value')) {
              if(_.contains(that.record, nearestNeighbor.cid)) {
                tile.set('y', (nearestNeighbor.get('y') - 1));
                return;
              }
              tile.set('y', nearestNeighbor.get('y'));
              nearestNeighbor.set('value', nearestNeighbor.get('value') + 1);

              that.record.push(nearestNeighbor.cid);
              tile.destroy();


              // Then we update the score ...
              // score.set('value', score.get('value') + nearestNeighbor.get('value'));
            }
            else {
              tile.set('y', (nearestNeighbor.get('y') - 1));
            }
          }
        });
      that.record = [];

      if(dirty) this.born();

      this.off('change');
    },
    right: function() {
      var that = this;
      var dirty = false;

      // Listen to collection's change, 
      // for determing if app to produce a new tile or not.
      that.on('change', function() {
        dirty = true;
      });

      this.chain()
        .sortBy(function(tile) {
          return 4 - tile.get('x');
        })
        .sortBy(function(tile) {
          return tile.get('y');
        })
        .each(function(tile) {
          var neighborTiles = that.chain().filter(function(neighbor) {
            return(neighbor.get('y') == tile.get('y')) && (neighbor.get('x') > tile.get('x'));
          });
          if(neighborTiles.value().length == 0) {
            tile.set('x', 4);
          }
          else { // There are neighbor(s)

            var nearestNeighbor = neighborTiles.min(function(tile) {
              return tile.get('x');
            }).value();



            if(nearestNeighbor.get('value') == tile.get('value')) {

              if(_.contains(that.record, nearestNeighbor.cid)) {
                tile.set('x', nearestNeighbor.get('x') - 1);
                return;
              }

              tile.set('x', nearestNeighbor.get('x'));
              nearestNeighbor.set('value', (nearestNeighbor.get('value') + 1));

              that.record.push(nearestNeighbor.cid);
              tile.destroy();


              // Then we update the score ...
              // score.set('value', score.get('value') + nearestNeighbor.get('value'));
            }
            else {
              tile.set('x', nearestNeighbor.get('x') - 1);
            }

          }

        });

      that.record = [];
      if(dirty) this.born();

      this.off('change');
    },
    born: function() {
      var ocupiedCells = [];
      var blankCells = [];

      this.each(function(model) {
        ocupiedCells.push({
          x: model.get('x'),
          y: model.get('y')
        });
      });

      blankCells = _(this.table).reject(function(cell) {
        return _(ocupiedCells).findWhere(cell);
      });

      var randomNum = _.random(0, blankCells.length - 1);

      this.add(blankCells[randomNum]);
      
      if (this.checkLose()) {
        this.trigger('lose');
      }
    },
    checkLose: function() {
      if (this.length !== 16) return false;
      var that = this;
      
      var returnValue = this.every(function (model) {
        var value = model.get('value');
        var neighborValues = [
          that.findWhere({x: model.get('x') + 1, y: model.get('y')}) && that.findWhere({x: model.get('x') + 1, y: model.get('y')}).get('value'), 
          that.findWhere({x: model.get('x') - 1, y: model.get('y')}) && that.findWhere({x: model.get('x') - 1, y: model.get('y')}).get('value'),
          that.findWhere({x: model.get('x'), y: model.get('y') + 1}) && that.findWhere({x: model.get('x'), y: model.get('y') + 1}).get('value'),
          that.findWhere({x: model.get('x'), y: model.get('y') - 1}) && that.findWhere({x: model.get('x'), y: model.get('y') - 1}).get('value'),
        ];

        return !(_.contains(neighborValues, value));
        
      });

      return returnValue;
    }
  });

  return TileCollection;
});