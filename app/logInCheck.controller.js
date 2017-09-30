angular.module('app').controller('logInCheckCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location', '$q', 'fbLogInStatusService',
                                    logInCheckCtrl]);

function logInCheckCtrl ($scope, $http, $routeParams,
                          $window, $location, $q, fbLogInStatusService) {

      var logInCheck = function() {
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
              console.log('Fail');
              console.log(data);
            });
          }

      logInCheck();   
}
