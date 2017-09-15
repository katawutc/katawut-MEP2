angular.module('app').controller('errorPageCtrl',
  ['$scope', '$http', '$routeParams', '$window',
    '$location', errorPageCtrl]);

function errorPageCtrl ($scope, $http, $routeParams, $window, $location) {
  $scope.errorMessage = $window.sessionStorage.errorMessage;
}
