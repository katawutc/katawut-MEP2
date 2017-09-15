angular.module('app').controller('signUpInstructionCtrl',
  ['$scope', '$http', '$routeParams', '$window', '$location', signUpInstructionCtrl]);

function signUpInstructionCtrl ($scope, $http, $routeParams, $window, $location) {
  $scope.signUpEmail = $window.sessionStorage.signUpEmail;
}
