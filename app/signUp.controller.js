// Sign up controller
angular.module('app').controller('signUpCtrl', signUpCtrl);

function signUpCtrl ($scope, $http, $location) {
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
          $location.path('/logIn');
        }
        else {
          console.log('other error');
          console.log(response.status);
          console.log(response.data);
          console.log(response.data.success);
          console.log(response.data.message);
          $location.path('/error')
        }
    }, function errorCallback(response) {
        console.log(response.data);
    });
  }
}