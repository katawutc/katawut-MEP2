angular.module('app').controller('dashboardSuCtrl',
  ['$scope', '$http', '$location', '$window', '$routeParams',
    'dashboardData', dashboardSuCtrl]);

function dashboardSuCtrl($scope, $http, $location, $window, $routeParams, dashboardData) {

    if (dashboardData && dashboardData.errorMessage) {

      $window.sessionStorage.setItem('errorMessage', dashboardData.errorMessage);
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }
    else if (dashboardData && !dashboardData.errorMessage) {

      $scope.userName = dashboardData.userName;
      $scope.userRole = dashboardData.userRole;
    }
    else {
      $window.sessionStorage.setItem('errorMessage', 'No Authorization');
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }
}
