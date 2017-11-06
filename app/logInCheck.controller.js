angular.module('app')
.controller('logInCheckCtrl',
           ['$window', '$rootScope',
            'fbLogInStatusService',
             logInCheckCtrl]);

function logInCheckCtrl ($window, $rootScope, fbLogInStatusService) {

      var logInCheck = function() {

        if (!$rootScope.fbSdkLoaded) {
          console.log('fb sdk not loaded; may be forbidden');
          $window.location.href = '#!/logIn';
        }
        else if ($rootScope.fbSdkLoaded) {

          fbLogInStatusService.getFBLogInStatus()
            .then(function(fbLogInStatus) {

              console.log(fbLogInStatus);

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
