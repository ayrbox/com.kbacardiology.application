(function() {
  'use strict';
  mobileApp
  .controller('AppCtrl', function($scope, $state, $ionicPopup, $timeout) {

    $scope.diplayCloseButton = !ionic.Platform.isIOS();

    $scope.exitApp = function() {
      $ionicPopup.confirm({
        title: 'Exit',
        template: 'Do want to exit?'
      }).then(function(okRes) {
        if(okRes) ionic.Platform.exitApp();
      });
    };

    $scope.$on('app:close', function() {
      ionic.Platform.exitApp();
    });

  })

  .controller('InitController', function($scope, $state, $ionicPlatform,
    $cordovaNetwork, $ionicPopup, $timeout, $cordovaInAppBrowser,
    $rootScope) {

    $scope.loadingStatus = {
      loading: 0,
      loaded: 1,
      closed: 2,
      loadingFailed: 3
    };

    $scope.status = $scope.loadingStatus.loading;


    function _launch() {
      $ionicPlatform.ready(function() {
        try {

          var _isOnline = $cordovaNetwork.isOnline();

          if(_isOnline) {
            $cordovaInAppBrowser.open('http://kba-cardiology.co.uk/applogin.html', '_blank', {
              location: 'no',
              clearcache: 'yes',
              toolbar: 'yes'
            }).then(function(event) {
              $scope.status = $scope.loadingStatus.loaded;

            }).catch(function(event) {
              //console.log('TODO: Unable to launch app');
              $ionicPopup.alert({
                title: 'Nework',
                template: 'Unable to start app. Please try again'
              });
              $scope.status = $scope.loadingStatus.loadingFailed;
            });
          } else {

            $scope.status = $scope.loadingStatus.loadingFailed;
            $ionicPopup.alert({
              title: 'Network',
              template: 'No network connection. Unable to launch'
            });
          }
        } catch (e) {
          $scope.status = $scope.loadingStatus.loadingFailed;
          $ionicPopup.alert({
            title: 'Network',
            template: e.message
          });
        }
      });
    }

    $scope.tryAgain = function() {
      $scope.status = $scope.loadingStatus.loading;
      $timeout(function() {
        _launch();
      }, 1000);
    };

    $timeout(function() {
      _launch();
    }, 500);

    $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){
      $scope.status = $scope.loadingStatus.closed;
      $scope.$emit('app:close');
    });

  });

}());
