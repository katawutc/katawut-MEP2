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

    // send chat message
    //$rootScope.sentMessage = [];

    $scope.sendMessage = function() {
        console.log('send chat message');
        console.log($scope.message);


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

}
