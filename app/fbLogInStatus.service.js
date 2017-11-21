angular.module('app')
.factory('fbLogInStatusService',
        ['$window', '$q', '$rootScope',
          fbLogInStatusService]);

function fbLogInStatusService($window, $q, $rootScope) {
  return {
      getFBLogInStatus : function() {

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
