angular.module('app')
.controller('chatPanelCtrl',
            ['$rootScope', '$scope',
             '$window',
             'socketService',
              chatPanelCtrl]);

function chatPanelCtrl($rootScope, $scope, $window, socketService) {

    $rootScope.openChatPanel = function() {

    $rootScope.showChatPanel = !$rootScope.showChatPanel;

  }

    $scope.sendMessage = function() {
        console.log('send chat message');
        console.log($scope.message);

        /**
          * The sent message should differentiate between admin and su \
          * to select the select the correct message format to send to the server
          */
        var message = {'userID': $window.sessionStorage.userID,
                       'userRole': $window.sessionStorage.userRole,
                       'sentTime': Date.now(),
                       'message': $scope.message}

        socketService.emit('chat', message);

        $rootScope.sentMessage.push('You: '+$scope.message);

        $scope.message = null;
    }

    socketService.on('chatRoom', function(message) {

      console.log(message);
      $rootScope.sentMessage.push(message);
    })

    /** the event to join chatting between admin and su has to be \
      * userID
      * admin should be able to select su to chat to
      */

    /*
    socketService.on($window.sessionStorage.userID, function(message) {

      console.log(message);
      $rootScope.sentMessage.push(message);
    })
    */

}
