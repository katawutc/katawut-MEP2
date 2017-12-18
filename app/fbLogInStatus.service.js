angular.module('app')
.factory('fbLogInStatusService',
        ['$window', '$q', '$rootScope',
          fbLogInStatusService]);

function fbLogInStatusService($window, $q, $rootScope) {
  return {
      getFBLogInStatus : function() {

          var deferred = $q.defer();

          // need to check if FB is available to getLoginStatus

          if ($rootScope.fbSdkLoaded) {

          FB.getLoginStatus(function(response) {
            if (response.status) {
              deferred.resolve(response.status);
            }
          })
          return deferred.promise;

        }
        else if (!$rootScope.fbSdkLoaded) {
          return 'fb sdk not loaded';
        }
      }
    }
  }
