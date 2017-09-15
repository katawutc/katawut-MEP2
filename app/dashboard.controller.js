angular.module('app').controller('dashboardCtrl',
  ['$scope', '$http', '$location', '$window', '$routeParams',
  'dashboardData', dashboardCtrl]);

function dashboardCtrl($scope, $http, $location, $window, $routeParams, dashboardData) {

    $scope.userName = dashboardData.userName;
    $scope.userEmail = dashboardData.userEmail;
    $scope.userID = dashboardData.userID;
  }
