angular.module('app')
.controller('logInCheckCtrl',
           ['$window', '$rootScope',
            'fbLogInStatusService',
             logInCheckCtrl]);

function logInCheckCtrl ($window, $rootScope, fbLogInStatusService) {

      var logInCheck = function() {

        //fb sdk not loaded; may be forbidden
        if (!$rootScope.fbSdkLoaded) {

          $window.location.href = '#!/logIn';
        }
        else if ($rootScope.fbSdkLoaded) {

          fbLogInStatusService.getFBLogInStatus()
            .then(function(fbLogInStatus) {

              if (fbLogInStatus === 'connected') {
                $window.location.href = '/auth/facebook';
              }
              else {
                $window.location.href = '#!/logIn';
              }
            },
            function(data) {

            });
          }
        }

      logInCheck();
}
