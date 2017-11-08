angular.module('app')
.controller('errorPageCtrl',
           ['$scope',
             errorPageCtrl]);

function errorPageCtrl ($scope) {

  $scope.errorMessage = $window.sessionStorage.errorMessage;
}
