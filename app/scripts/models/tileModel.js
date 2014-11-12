define(['backbone'], function(Backbone) {
  var TileModel = Backbone.Model.extend({
    urlRoot: '',
    defaults: {
      value: 1,
      x: 1,
      y: 1
    },
    initialize: function() {
      this.on('invalid', function() {
        console.log('invalid');
      });
    },
    validate: function(attrs, options) {
      if (attrs.value > 10) {
        return "The user win the game!";
      }
    },
    /**
     * Change model's propertiess
     *
     * @public
     * @param {(Object | string)}  option   The property object that this model will update
     * @param {number}  option.isCombining  Judge if this model should swallow its neighbor model and double its value
     * @param {number=} option.dx           The model's x increment
     * @param {number=} option.dy           The model's y increment
     *
     */
    updateProp: function(option) {
      if (typeof option == 'undefined') return false;
      if (typeof option == 'boolean') {
        option ? this.set('value', this.get('value') + 1) : $.noop();
      }
      else if (typeof option == 'object') {
        if (option.isCombining) this.set('value', this.get('value') + 1);
        if ('dx' in option && typeof option.dx == 'number') {
          this.set('x', this.get('x') + option.dx);
        }
        if ('dy' in option && typeof option.dy == 'number') {
          this.set('y', this.get('y') + option.dy);
        }
      }
      else {
        throw new Error('Unexpected arguments type!');
      }
    }
  });
  return TileModel;
});
