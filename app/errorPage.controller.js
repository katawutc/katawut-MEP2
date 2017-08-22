angular.module('app').controller('errorPageCtrl', errorPageCtrl);

function errorPageCtrl ($scope, $http, $routeParams, $window, $location) {
  $scope.errorMessage = $window.sessionStorage.errorMessage;
}
