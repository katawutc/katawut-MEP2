angular.module('app').controller('navBarController', navBarController);

function navBarController ($scope, $http, $location, $window) {

    $scope.logIn = false;

    $scope.isLogIn = function() {
      return $scope.logIn;
    }

    if ($window.sessionStorage.getItem('logInmessage') === 'login success') {
      $scope.logIn = true;
    } else { $scope.logIn = false; }

    $scope.checkFBLogIn = function() {
      console.log('checkFBLogIn');

      if($window.FB) console.log('$window.FB');

      console.log($window.FB);


      $window.FB.init({
        appId      : '141198316480017',
        status     : true,
        cookie     : true,  // enable cookies to allow the server to access
                        // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      })

      $window.FB.getLoginStatus(function(response) {
        console.log('getLoginStatus');
        console.log(response.status);
        //statusChangeCallback(response);
        if (response.status === 'unknown') {
          $location.path('/logIn');
        }
      });

    }
}
