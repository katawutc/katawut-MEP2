angular.module('app').controller('dashboardCtrl', dashboardCtrl);

function dashboardCtrl($scope, $http, $location, $window, $routeParams, dashboardData) {

    $scope.user = dashboardData.userName;
    $scope.email = dashboardData.userEmail;
    $scope.id = dashboardData._id;
  }
