angular.module('app')
.controller('navBarSuController',
           ['$scope', '$window',
             navBarSuController]);

function navBarSuController ($scope, $window) {

    $scope.userID = $window.sessionStorage.userID;

    $scope.logIn = false;

    $scope.isLogIn = function() {
      return $scope.logIn;
    }

    if ($window.sessionStorage.getItem('logInMessage') === 'login success') {

      $scope.logIn = true;
      
    } else { $scope.logIn = false; }
}
