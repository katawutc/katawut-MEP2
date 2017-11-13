angular.module('app')
.controller('adChatPanelCtrl',
           ['$rootScope', '$scope', '$window',
            'chatIOService',
            'chatAdminService',
             adChatPanelCtrl]);

function adChatPanelCtrl($rootScope, $scope, $window,
                         chatIOService,
                         chatAdminService) {

    $scope.sendMessage = function() {

        console.log('adminChatTo: '+chatAdminService.getUserToChat());

        var message = {'userID': $window.sessionStorage.userID,
                       'userRole': $window.sessionStorage.userRole,
                       'adminChatTo': chatAdminService.getUserToChat(),
                       'sentTime': Date.now(),
                       'message': $scope.message}

        chatIOService.emit('chat', message);

        $rootScope.adSentMessage.push('You: '+$scope.message);

        $scope.message = null;

    }


    chatIOService.on('toAdmin', function(message) {

      console.log(message);

      $rootScope.adSentMessage.push(message);

    })

    /*
    chatIOService.on($rootScope.selectedUserID, function(message) {

      console.log(message);

      $rootScope.adSentMessage.push(message);
    })
    */

}
