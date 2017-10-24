// Log in controller
angular.module('app')
.controller('logInCtrl',
           ['$scope', '$http', '$location', '$window',
            'socketService',
             logInCtrl]);

function logInCtrl ($scope, $http, $location, $window, socketService) {

  $scope.logInSubmit = function() {
    $http({
      method: 'POST',
      url: '/logIn',
      data: $scope.credential
    }).then(function successCallback(response) {

        // to work out on the asynchronous call function

        if (response.data) {
        $window.sessionStorage.setItem('userName', response.data.userName);
        $window.sessionStorage.setItem('userID', response.data.userID);
        $window.sessionStorage.setItem('userRole', response.data.userRole);
        $window.sessionStorage.setItem('token', response.data.token);
        $window.sessionStorage.setItem('logInMessage', response.data.message);
        $window.sessionStorage.setItem('activate', response.data.activate);

        // socket.io connect before routing to su dashboard
        // need to think more on this
        if (response.data.userRole) {
          socketService.emit('suConnect', $window.sessionStorage.userID);
        }

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
