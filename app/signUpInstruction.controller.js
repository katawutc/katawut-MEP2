angular.module('app').controller('signUpInstructionCtrl',
                                  signUpInstructionCtrl);

function signUpInstructionCtrl ($scope, $http, $routeParams, $window, $location) {
  $scope.signUpEmail = $window.sessionStorage.signUpEmail;
}
