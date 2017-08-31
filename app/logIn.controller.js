// Log in controller
angular.module('app').controller('logInCtrl', logInCtrl);

function logInCtrl ($scope, $http, $location, $window) {

  //var vm = this;

  $scope.logInSubmit = function() {
    $http({
      method: 'POST',
      url: '/logIn',
      data: $scope.credentials
    }).then(function successCallback(response) {

        // to work out on the asynchronous call function

        if (response.data) {
        $window.sessionStorage.setItem('userName', response.data.userName);
        $window.sessionStorage.setItem('userID', response.data.userID);
        $window.sessionStorage.setItem('userRole', response.data.userRole);
        $window.sessionStorage.setItem('token', response.data.token);
        $window.sessionStorage.setItem('logInMessage', response.data.message);

        // Get userID here to start dashboard controller
        if (response.data.message === 'login success') {
          $location.path('/dashboard'+'/'+
                          $window.sessionStorage.getItem('userRole')+'/'+
                          $window.sessionStorage.getItem('userID'));
        }
        else if (response.data.message === 'login fail') {
          $location.path('/login');
        }
        else if (response.data.message === 'login fail:FB') {
          $scope.logInErrorMessage = 'You have logged in with Facebook before; please use facebook log in';
        }
      }
      else {
        $scope.logInErrorMessage = 'Wrong Email address or password';
      }

      }, function errorCallback(response) {
          $location.path('/logIn');
        });
    }
};
