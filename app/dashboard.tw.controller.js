angular.module('app').controller('dashboardTwCtrl',
  ['$scope', '$http', '$location', '$window', '$routeParams',
    'dashboardData', dashboardTwCtrl]);

function dashboardTwCtrl($scope, $http, $location, $window, $routeParams, dashboardData) {

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
