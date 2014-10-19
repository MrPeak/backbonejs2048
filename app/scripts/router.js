define([
  'backbone'
], function(Backbone) {
  'use strict';

  var Workspace = Backbone.Router.extend({
    routes: {
      'home': 'home',
      'search/:q': 'search',
      'search/:q/user:id': 'search'
    },
    home: function() {
      console.log('It\'s home.')
    },
    search: function(q, id) {
      console.log({
        q: q,
        id: id
      });
    }
  });


  var initialize = function() {
    var work = new Workspace();
    Backbone.history.start();
  };

  return {
    initialize: initialize
  }
});
