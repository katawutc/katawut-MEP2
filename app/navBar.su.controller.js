angular.module('app')
.controller('navBarSuController',
           ['$scope', '$window',
             navBarSuController]);

function navBarSuController ($scope, $window) {

    $scope.userID = $window.sessionStorage.userID;

    $scope.logIn = false;

    $scope.isLogIn = function() {
      return $scope.logIn;
    }

    if ($window.sessionStorage.getItem('logInMessage') === 'login success') {

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
