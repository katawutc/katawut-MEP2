angular.module('app')
.controller('adChatPanelCtrl',
           ['$rootScope', '$scope', '$window',
            'chatIOService',
            'chatAdminService',
             adChatPanelCtrl]);

function adChatPanelCtrl($rootScope, $scope, $window,
                         chatIOService,
                         chatAdminService) {

    /** need to implement $scope.adSentMessage to channel for each su user */
    $scope.adSentMessage = [];

    /** close the admin chat panel */
    $scope.closeChatPanel = function() {

      $rootScope.showAdChatPanel = false;
    }

    $rootScope.adNewChat = function() {

      console.log('admin new chat');
      $rootScope.adChatStartAt[$rootScope.selectedSuID] = Date.now();

      console.log($rootScope.adChatStartAt);
      console.log($rootScope.adChatStartAt[$rootScope.selectedSuID]);

    }

    $scope.sendMessage = function() {

      if ($rootScope.selectedSuID) {

        var message = {'userID': $window.sessionStorage.userID,
                       'userRole': $window.sessionStorage.userRole,
                       'suID': $rootScope.selectedSuID,
                       'chatStartAt': $rootScope.adChatStartAt[$rootScope.selectedSuID],
                       'sentTime': Date.now(),
                       'message': $scope.message,
                       'sentSuccess': false}

         chatIOService.emit('chat', message);

         $scope.adSentMessage.push('You: '+$scope.message);

         $scope.message = null;
      }



      /*

        if (!$rootScope.suID) {

        var message = {'userID': $window.sessionStorage.userID,
                       'userRole': $window.sessionStorage.userRole,
                       'adminChatTo': chatAdminService.getSuToChat(),
                       'sentTime': Date.now(),
                       'message': $scope.message,
                       'sentSuccess': false}

        chatIOService.emit('chat', message);

        /** admin sent message need to keep for various su */
        /*

        $scope.adSentMessage.push('You: '+$scope.message);

        $scope.message = null;
      }
      else if ($rootScope.suID) {

        var message = {'userID': $window.sessionStorage.userID,
                       'userRole': $window.sessionStorage.userRole,
                       'suID': $rootScope.suID,
                       'chatStartAt': $rootScope.ChatStartAt[$rootScope.suID],
                       'sentTime': Date.now(),
                       'message': $scope.message,
                       'sentSuccess': false}

        chatIOService.emit('chat', message);

        $scope.adSentMessage.push('You: '+$scope.message);

        $scope.message = null;
      }
      */

    }



    chatIOService.on($window.sessionStorage.userID, function(data) {

      $scope.adSentMessage.push('su: '+data.message);

      // implement message received acknowledge
      data.sentSuccess = true;
      console.log(data);
      chatIOService.emit('suMessageReceive', data);
    })







    chatIOService.on('toAdmin', function(message) {

      $scope.adSentMessage.push(message);

    })

    chatIOService.on('fromSu', function(data) {

      $rootScope.showAdChatPanel = true;

      $scope.adSentMessage.push('su: '+data.message);

      $rootScope.suID = data.userID;

      /** implement message received acknowledgement */
      data.sentSuccess = true;

      console.log(data);

      // to keep chat start at
      $rootScope.ChatStartAt[$rootScope.suID] = data.chatStartAt;
      console.log($rootScope.ChatStartAt);

      chatIOService.emit('suMessageReceive', data);

    })

}
