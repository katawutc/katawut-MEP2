angular.module('app').controller('dashboardSuCtrl', dashboardSuCtrl);

function dashboardSuCtrl($scope, $http, $location, $window, $routeParams, dashboardData) {

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
