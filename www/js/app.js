var mobileApp;
(function() {
  'use strict';
  mobileApp = angular.module('kbamobileapp', ['ionic', 'ngCordova']);
  mobileApp
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/container.html',
      controller: 'AppCtrl'
    })
    .state('app.init', {
      url: '/init',
      views: {
        'content': {
          templateUrl: 'templates/init.html',
          controller: 'InitController'
        }
      }
    });
    $urlRouterProvider.otherwise('/app/init');
  });
}());
