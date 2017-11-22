angular.module('app')
.controller('adChatPanelCtrl',
           ['$rootScope', '$scope', '$window',
            'chatIOService',
            'chatAdminService',
             adChatPanelCtrl]);

function adChatPanelCtrl($rootScope, $scope, $window,
                         chatIOService,
                         chatAdminService) {

    $scope.adSentMessage = [];

    /** close the admin chat panel */
    $scope.closeChatPanel = function() {

      $rootScope.showAdChatPanel = false;
    }

    $scope.sendMessage = function() {

        if (!$rootScope.suSocketID) {

        var message = {'userID': $window.sessionStorage.userID,
                       'userRole': $window.sessionStorage.userRole,
                       'adminChatTo': chatAdminService.getUserToChat(),
                       'sentTime': Date.now(),
                       'message': $scope.message}

        chatIOService.emit('chat', message);

        $scope.adSentMessage.push('You: '+$scope.message);

        $scope.message = null;
      }
      else if ($rootScope.suSocketID) {

        var message = {'userID': $window.sessionStorage.userID,
                       'userRole': $window.sessionStorage.userRole,
                       'suSocketID': $rootScope.suSocketID,
                       'sentTime': Date.now(),
                       'message': $scope.message}

        chatIOService.emit('chat', message);

        $scope.adSentMessage.push('You: '+$scope.message);

        $scope.message = null;
      }

    }


    chatIOService.on('toAdmin', function(message) {

      $scope.adSentMessage.push(message);

    })

    chatIOService.on('fromSu', function(data) {

      $rootScope.showAdChatPanel = true;

      $scope.adSentMessage.push('su: '+data.message);

      $rootScope.suSocketID = data.suSocketID;

      // for su userID chatStartAt
      $rootScope.chatStartAt.push({'userID': data.userID,
                                   'chatStartAt': data.chatStartAt});

    })

}
