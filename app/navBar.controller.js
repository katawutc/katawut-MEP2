angular.module('app').controller('navBarController',
                                ['$q', '$scope', '$http', '$location',
                                 '$window', 'socketService',
                                  navBarController]);

function navBarController ($q, $scope, $http, $location, $window, socketService) {

    $scope.logIn = false;

    $scope.isLogIn = function() {
      return $scope.logIn;
    }

    if ($window.sessionStorage.getItem('logInmessage') === 'login success') {
      $scope.logIn = true;
    } else { $scope.logIn = false; }

  }
