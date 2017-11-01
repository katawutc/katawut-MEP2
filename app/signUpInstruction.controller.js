angular.module('app')
.controller('signUpInstructionCtrl',
           ['$scope',
             signUpInstructionCtrl]);

function signUpInstructionCtrl ($scope) {
  
  $scope.signUpEmail = $window.sessionStorage.signUpEmail;
}
