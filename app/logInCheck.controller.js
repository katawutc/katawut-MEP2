angular.module('app').controller('logInCheckCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location', 'fbLogInStatus',
                                    logInCheckCtrl]);

function logInCheckCtrl ($scope, $http, $routeParams,
                          $window, $location, fbLogInStatus) {

      if (fbLogInStatus === 'connected') {
        $window.location.href = '/auth/facebook';
      }
      else {
        $window.location.href = '#!/logIn';
      }

}
