angular.module('app').controller('navBarController', navBarController);

function navBarController ($q, $scope, $http, $location, $window) {

    $scope.logIn = false;

    $scope.isLogIn = function() {
      return $scope.logIn;
    }

    if ($window.sessionStorage.getItem('logInmessage') === 'login success') {
      $scope.logIn = true;
    } else { $scope.logIn = false; }

    /** to check if FB log in status before route to the correct path  */
    $scope.checkFBLogIn = function() {

      $window.FB.init({
        appId      : '141198316480017',
        status     : true,
        cookie     : true,  // enable cookies to allow the server to access
                        // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      })


      var fbStatusDeferred = $q.defer();

      var fbStatusPromise = fbStatusDeferred.promise;

      $window.FB.getLoginStatus(function(response) {
        console.log('getLoginStatus');
        console.log(response.status);
        statusChangeCallback(response);
      });



    function statusChangeCallback(response) {

    console.log('statusChangeCallback');
    console.log(response.status);

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log('route to the correct user dashboard');
      $window.location.href = '/auth/facebook';
    }
    if (response.status === 'unknown'){
      $location.path('/logIn');
    }
  }



    }
}
