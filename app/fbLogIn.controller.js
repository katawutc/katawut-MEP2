angular.module('app').controller('fbLogInCtrl',
                                  fbLogInCtrl);

function fbLogInCtrl ($scope, $http, $routeParams, $window,
                                $location) {

    console.log('at fb log in controller');

    console.log($routeParams.fbID);

    var fbID = {fbID: $routeParams.fbID};

    console.log(fbID);

    $http({
      url: 'fbLogIn',
      method: 'POST',
      data: fbID
    }).then(function successCallback(response) {
      console.log(response.data);
      if (response.data) {
      $window.sessionStorage.setItem('userName', response.data.userName);
      $window.sessionStorage.setItem('userID', response.data.userID);
      $window.sessionStorage.setItem('userRole', response.data.userRole);
      $window.sessionStorage.setItem('token', response.data.token);
      $window.sessionStorage.setItem('logInMessage', response.data.message);

      // Get userID here to start dashboard controller
      if ($window.sessionStorage.getItem('logInMessage') === 'login success') {
        $location.path('/dashboard'+'/'+
                        $window.sessionStorage.getItem('userRole')+'/'+
                        $window.sessionStorage.getItem('userID'));
      }
      else if ($window.sessionStorage.getItem('logInMessage') === 'login fail') {
        $location.path('/login');
      }
      }
    },function errorCallback(response){
      console.log(response.data);
    });
  }
