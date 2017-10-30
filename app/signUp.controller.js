// Sign up controller
angular.module('app')
.controller('signUpCtrl',
           ['$scope', '$http', '$location', '$window',
             signUpCtrl]);

function signUpCtrl ($scope, $http, $location, $window) {

  $scope.signUpSubmit = function() {

    $http({
      method: 'POST',
      url: 'signUp',
      data: $scope.formData
    }). then(function successCallback(response) {
        if (response.data.success === false && response.data.message === 'user Email already exist!'){
          $scope.message = response.data.message + ' Please select another Email';
        }
        else if (response.data.success === true && response.data.message === 'sign up success') {

          // route to the sign up email instruction is spent
          $window.sessionStorage.setItem('signUpEmail', response.data.signUpEmail);
          $location.path('/signUpInstruction');
        }
        else {

          $location.path('/errorPage')
        }
    }, function errorCallback(response) {

    });
  }
}
