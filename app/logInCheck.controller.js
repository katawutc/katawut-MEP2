angular.module('app').controller('logInCheckCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location', 'fbLogInStatus',
                                    logInCheckCtrl]);

function logInCheckCtrl ($scope, $http, $routeParams,
                          $window, $location, fbLogInStatus) {

    console.log(fbLogInStatus);

      if (fbLogInStatus === 'connected') {
        // Logged into your app and Facebook.
        // route to the correct user dashboard
        $window.location.href = '/auth/facebook';
      }
      else {
        $window.location.href = '#!/logIn';
      }

}
