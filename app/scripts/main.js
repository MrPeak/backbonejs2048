/*global require*/
'use strict';

require.config({
  shim: {
    semantic: ['jquery']
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    epoxy: './vendor/backbone.epoxy',
    text: '../bower_components/requirejs-text/text',
    semantic: '../bower_components/semantic-ui/build/packaged/javascript/semantic'
  }
});

require(['app', 'semantic'], function(App) {

  App.initialize();

});
