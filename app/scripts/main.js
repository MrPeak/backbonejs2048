/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    epoxy: './vendor/backbone.epoxy'
  }
});

require([
  'backbone',
  'epoxy'
], function(Backbone) {
  Backbone.history.start();
  console.log(Backbone.Epoxy);
});
