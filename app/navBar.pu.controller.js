angular.module('app').controller('navBarPuController', navBarPuController);

function navBarPuController ($scope, $http, $location, $window) {
    $scope.logIn = false;

    $scope.isLogIn = function() {
      return $scope.logIn;
    }

    if ($window.sessionStorage.getItem('logInMessage') === 'login success') {
      $scope.logIn = true;
    } else { $scope.logIn = false; }
}
