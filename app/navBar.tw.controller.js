angular.module('app').controller('navBarTwController',
  ['$scope', '$http', '$location', '$window', navBarTwController]);

function navBarTwController ($scope, $http, $location, $window) {

    $scope.userID = $window.sessionStorage.userID;

    $scope.logIn = false;

    $scope.isLogIn = function() {
      return $scope.logIn;
    }

    if ($window.sessionStorage.getItem('logInMessage') === 'login success') {
      $scope.logIn = true;
    } else { $scope.logIn = false; }
}
