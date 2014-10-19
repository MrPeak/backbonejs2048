/*global require*/
'use strict';

require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    epoxy: './vendor/backbone.epoxy'
  }
});

require([
  'app'
], function(App) {

  App.initialize();

});
