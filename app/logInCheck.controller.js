angular.module('app')
.controller('logInCheckCtrl',
           ['$window', 'fbLogInStatusService',
             logInCheckCtrl]);

function logInCheckCtrl ($window, fbLogInStatusService) {

      var logInCheck = function() {
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

      logInCheck();
}
