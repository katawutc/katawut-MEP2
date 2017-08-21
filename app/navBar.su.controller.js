angular.module('app').controller('navBarSuController', navBarSuController);

function navBarSuController ($scope, $http, $location, $window) {
    $scope.logIn = false;

    $scope.isLogIn = function() {
      return $scope.logIn;
    }

    if ($window.sessionStorage.getItem('message') === 'login success') {
      $scope.logIn = true;
    } else { $scope.logIn = false; }
}
