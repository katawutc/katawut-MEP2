angular.module('app')
.controller('errorPageCtrl',
           ['$scope', 'window',
             errorPageCtrl]);

function errorPageCtrl ($scope, $window) {

  $scope.errorMessage = $window.sessionStorage.errorMessage;
}
