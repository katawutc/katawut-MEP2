angular.module('app')
.controller('adChatPanelCtrl',
           ['$rootScope', '$scope', '$window',
            'chatIOService',
             adChatPanelCtrl]);

function adChatPanelCtrl($rootScope, $scope, $window, chatIOService) {

    $rootScope.openChatPanel = function() {

    $rootScope.showAdChatPanel = !$rootScope.showAdChatPanel;

  }

    $scope.sendMessage = function() {

        var message = {'userID': $window.sessionStorage.userID,
                       'userRole': $window.sessionStorage.userRole,
                       'sentTime': Date.now(),
                       'message': $scope.message}

        chatIOService.emit('chat', message);

        $rootScope.adSentMessage.push('You: '+$scope.message);

        $scope.message = null;

    }

    chatIOService.on($window.sessionStorage.userID, function(message) {

      $rootScope.adSentMessage.push(message);
    })

}
