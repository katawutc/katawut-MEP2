angular.module('app').controller('dashboardCtrl', dashboardCtrl);

function dashboardCtrl($scope, $http, $location, $window, $routeParams, dashboardData) {

    $scope.userName = dashboardData.userName;
    $scope.userEmail = dashboardData.userEmail;
    $scope.userID = dashboardData.userID;
  }
