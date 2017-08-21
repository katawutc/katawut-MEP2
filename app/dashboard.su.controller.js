angular.module('app').controller('dashboardSuCtrl', dashboardSuCtrl);

function dashboardSuCtrl($scope, $http, $location, $window, $routeParams, dashboardData) {

    $scope.userName = dashboardData.userName;
    $scope.userEmail = dashboardData.userEmail;
    $scope.userID = dashboardData.userID;
  }
