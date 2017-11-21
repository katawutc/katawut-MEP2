
angular.module('app')
.controller('logOutCtrl',
           ['$scope', '$window', '$rootScope',
            'fbLogInStatus', 'socketService', 'chatIOService',
             logOutCtrl]);

function logOutCtrl($scope, $window, $rootScope,
                    fbLogInStatus, socketService, chatIOService) {

    /** log out */
    socketService.emit('logOut', $window.sessionStorage.userID);
    chatIOService.emit('logOut', $window.sessionStorage.userID);

    // To implement asynchronous function before pass message to view
    $window.sessionStorage.clear();

    if (fbLogInStatus === 'connected') {
      FB.logout(function(response) {
      // user is now logged out both MEP and FB

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
