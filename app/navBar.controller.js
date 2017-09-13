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

      /** to implement asynchronous $q, defer, promise
        var fbStatusDeferred = $q.defer();
        var fbStatusPromise = fbStatusDeferred.promise;
      */

      $window.FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });

    function statusChangeCallback(response) {

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      // route to the correct user dashboard
      $window.location.href = '/auth/facebook';
    }
    else {
      $window.location.href = '#!/logIn';
      //$location.path('/logIn');
    }
  }

  }
}
