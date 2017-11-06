angular.module('app')
.factory('fbLogInStatusService',
        ['$window', '$q', '$rootScope',
          fbLogInStatusService]);

function fbLogInStatusService($window, $q, $rootScope) {
  return {
      getFBLogInStatus : function() {

        /*
        FB.init({
          appId      : '141198316480017',
          status     : true,
          cookie     : true,  // enable cookies to allow the server to access
                          // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.8' // use graph api version 2.8
        })
        */


        /** if fb sdk fails to load */
        if (!$rootScope.fbSdkLoaded) {
          return 'fb sdk not loaded';
        }
        else if ($rootScope.fbSdkLoaded) {

          var deferred = $q.defer();

          FB.getLoginStatus(function(response) {
            if (response.status) {
              deferred.resolve(response.status);
            }
          })
          return deferred.promise;
        }
      }
    }
  }
