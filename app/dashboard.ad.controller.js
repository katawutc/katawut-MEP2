angular.module('app').controller('dashboardAdCtrl', dashboardAdCtrl);

function dashboardAdCtrl($scope, $http, $location, $window, $routeParams, dashboardData) {

    if (dashboardData) {
      $scope.userName = dashboardData.userName;
      $scope.userRole = dashboardData.userRole;
  }
  else {
    $window.sessionStorage.setItem('errorMessage', 'No Authorization');
    $window.sessionStorage.setItem('logInMessage', 'login fail');
    $location.path('/errorPage');
  }
}
