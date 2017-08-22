angular.module('app').controller('dashboardPuCtrl', dashboardPuCtrl);

function dashboardPuCtrl($scope, $http, $location, $window, $routeParams, dashboardData) {

    if (dashboardData) {
    $scope.userName = dashboardData.userName;
    $scope.userEmail = dashboardData.userEmail;
    $scope.userID = dashboardData.userID;
  }
  else {
    $window.sessionStorage.setItem('errorMessage', 'No Authorization');
    $window.sessionStorage.setItem('logInMessage', 'login fail');
    $location.path('/errorPage');
  }
}
