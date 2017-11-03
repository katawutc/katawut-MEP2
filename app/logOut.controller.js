
angular.module('app')
.controller('logOutCtrl',
           ['$scope', '$window', '$rootScope',
            'fbLogInStatus',
             logOutCtrl]);

function logOutCtrl($scope, $window, $rootScope,
                    fbLogInStatus) {

    // To implement asynchronous function before pass message to view
    $window.sessionStorage.clear();

    console.log(fbLogInStatus);

    if (fbLogInStatus === 'connected') {
      FB.logout(function(response) {
      // user is now logged out both MEP and FB
      console.log(response);
      });
    }

    $scope.message = 'You have successfully logged out.';

    // clear the $rootScope
    // need to find a better way to clear the $rootScope
    $rootScope.suSecondNavBarMessage = null;
    $rootScope.showChatPanel = false;
    $rootScope.showNotePanel = false;
    $rootScope.message = null;
  }
