angular.module('app').factory('fbLogInStatusService',
  ['$http', '$route', '$window', '$q', fbLogInStatusService]);

function fbLogInStatusService($http, $route, $window, $q) {
  return {
      getFBLogInStatus : function() {

        $window.FB.init({
          appId      : '141198316480017',
          status     : true,
          cookie     : true,  // enable cookies to allow the server to access
                          // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.8' // use graph api version 2.8
        })

        var deferred = $q.defer();

        $window.FB.getLoginStatus(function(response) {
          if (response.status) {
            deferred.resolve(response.status);
          }
      })
      return deferred.promise;
    }
  }
}


/**

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
      }
    }

    }

**/
