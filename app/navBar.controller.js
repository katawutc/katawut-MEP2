angular.module('app').controller('navBarController', navBarController);

function navBarController ($scope, $http, $location, $window) {
    $scope.logIn = false;

    $scope.isLogIn = function() {
      return $scope.logIn;
    }

    if ($window.sessionStorage.getItem('logInmessage') === 'login success') {
      $scope.logIn = true;
    } else { $scope.logIn = false; }
}
