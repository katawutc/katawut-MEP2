angular.module('app')
.controller('signUpInstructionCtrl',
           ['$scope', '$window',
             signUpInstructionCtrl]);

function signUpInstructionCtrl ($scope, $window) {

  $scope.signUpEmail = $window.sessionStorage.signUpEmail;
}
