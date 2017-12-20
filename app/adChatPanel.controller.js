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
    //$scope.adSentMessage = [];
    //$rootScope.adSentMessage = [];

    /** close the admin chat panel */
    $scope.closeChatPanel = function() {

      $rootScope.showAdChatPanel = false;
    }

    $rootScope.adNewChat = function() {

      $rootScope.adSentMessage = [];

      $rootScope.adChatStartAt[$rootScope.selectedSuID] = Date.now();
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

         //$scope.adSentMessage.push('You: '+$scope.message);
         $rootScope.adSentMessage.push('You: '+$scope.message);

         $scope.message = null;
      }
    }

    chatIOService.on($window.sessionStorage.userID, function(data) {

      //$scope.adSentMessage.push('su: '+data.message);
      $rootScope.adSentMessage.push('su: '+data.message);

      // implement message received acknowledge
      data.sentSuccess = true;

      chatIOService.emit('suMessageReceive', data);
    })

    //chatIOService.on('fromSu', function(data) {
    chatIOService.on('toAllAdmin', function(data) {

      $rootScope.showAdChatPanel = true;

      //$scope.adSentMessage.push('su: '+data.message);
      $rootScope.adSentMessage.push('su: '+data.message);

      $rootScope.selectedSuID = data.userID;
      //$rootScope.suID = data.userID;

      /** implement message received acknowledgement */
      data.sentSuccess = true;

      // to keep chat start at
      $rootScope.adChatStartAt[data.userID] = data.chatStartAt;

      chatIOService.emit('suMessageReceive', data);

    })
}
