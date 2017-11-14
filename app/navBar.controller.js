angular.module('app').controller('navBarController',
                                ['$scope', '$window',
                                  navBarController]);

function navBarController ($scope, $window) {

    /** to consider having logIn and isLogIn as $rootScope \
      * for centralizing socket.io on user visits the page
      */

    $scope.logIn = false;

    $scope.isLogIn = function() {
      return $scope.logIn;
    }

    if ($window.sessionStorage.getItem('logInmessage') === 'login success') {
      $scope.logIn = true;
    } else { $scope.logIn = false; }

    $scope.shareUs = function() {

      FB.ui(
        {
          method: 'share',
          href: 'https://tranquil-chamber-47085.herokuapp.com',
        },
        // callback
        function(response) {
          if (response && !response.error_message) {
            //alert('Posting completed.');
          } else {
            //alert('Error while posting.');
          }
        }
      );
    }
  }
