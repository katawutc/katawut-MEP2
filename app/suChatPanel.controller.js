angular.module('app')
.controller('suChatPanelCtrl',
           ['$rootScope', '$scope', '$window',
            'chatIOService',
             suChatPanelCtrl]);

function suChatPanelCtrl($rootScope, $scope, $window, chatIOService) {

    /** root scope chat message to keep chat  */
    $rootScope.chatMessage = [];

    $rootScope.openChatPanel = function() {

      $rootScope.showChatPanel = !$rootScope.showChatPanel;
  }

    $rootScope.newChat = function() {

      $rootScope.chatStartAt = Date.now();

      /** new chat clear up chatMessage in sessionStorage */
      $rootScope.chatMessage = [];
    }

    $scope.sendMessage = function() {

        /** need to find chat start at time for suChat recording */
        if ($rootScope.chatMessage.length === 0) {

          $rootScope.chatStartAt = Date.now();
        }

        if ($rootScope.adID) {

          var message = {'userID': $window.sessionStorage.userID,
                         'userRole': $window.sessionStorage.userRole,
                         'adID': $rootScope.adID,
                         'chatStartAt': $rootScope.chatStartAt,
                         'sentTime': Date.now(),
                         'message': $scope.message,
                         'sentSuccess': false}

          chatIOService.emit('chat', message);

          $rootScope.chatMessage.push('You: '+$scope.message);

          $scope.message = null;
      }
      else if (!$rootScope.adID){

        var message = {'userID': $window.sessionStorage.userID,
                       'userRole': $window.sessionStorage.userRole,
                       'chatStartAt': $rootScope.chatStartAt,
                       'sentTime': Date.now(),
                       'message': $scope.message,
                       'sentSuccess': false}

        chatIOService.emit('chat', message);

        $rootScope.chatMessage.push('You: '+$scope.message);

        $scope.message = null;
      }

    }

    chatIOService.on($window.sessionStorage.userID, function(data) {

      $rootScope.chatMessage.push('Admin: '+data.message);

      // implement message received acknowledge
      $rootScope.adID = data.userID;

      $rootScope.chatStartAt = data.chatStartAt;

      data.sentSuccess = true;

      chatIOService.emit('adMessageReceive', data);
    })

    chatIOService.on('fromAdmin', function(data) {

      data.sentSuccess = true;

      chatIOService.emit('adMessageReceive', data);

      $rootScope.chatMessage.push('Admin: '+data.message);

    })
}
