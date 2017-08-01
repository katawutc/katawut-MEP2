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

        $window.sessionStorage.setItem('userName', response.data.userName);
        $window.sessionStorage.setItem('userID', response.data.userID);
        $window.sessionStorage.setItem('token', response.data.token);
        $window.sessionStorage.setItem('message', response.data.message);

        // Get userID here to start dashboard controller
        if ($window.sessionStorage.getItem('message') === 'login success') {
          //$location.path('/dashboard'+'/'+$window.sessionStorage.getItem('user'));
          $location.path('/dashboard'+'/'+$window.sessionStorage.getItem('userID'));
        }
        else if ($window.sessionStorage.getItem('message') === 'login fail') {
          $location.path('/login');
        }

      }, function errorCallback(response) {
          $location.path('/logIn');
        });
    }
};
