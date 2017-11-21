angular.module('app')
.controller('suChatPanelCtrl',
           ['$rootScope', '$scope', '$window',
            'chatIOService',
             suChatPanelCtrl]);

function suChatPanelCtrl($rootScope, $scope, $window, chatIOService) {

    $rootScope.openChatPanel = function() {

    $rootScope.showChatPanel = !$rootScope.showChatPanel;

  }

    $scope.sendMessage = function() {

        if ($rootScope.adminSocketID) {

          var message = {'userID': $window.sessionStorage.userID,
                         'userRole': $window.sessionStorage.userRole,
                         'adminSocketID': $rootScope.adminSocketID,
                         'sentTime': Date.now(),
                         'message': $scope.message}

          chatIOService.emit('chat', message);

          $rootScope.sentMessage.push('You: '+$scope.message);

          $scope.message = null;
      }
      else {

        var message = {'userID': $window.sessionStorage.userID,
                       'userRole': $window.sessionStorage.userRole,
                       'sentTime': Date.now(),
                       'message': $scope.message}

        chatIOService.emit('chat', message);

        $rootScope.sentMessage.push('You: '+$scope.message);

        $scope.message = null;
      }

    }

    chatIOService.on($window.sessionStorage.userID, function(data) {

      $rootScope.adminSocketID = data.adminSocketID;

      $rootScope.sentMessage.push('Admin: '+data.message);
    })

    chatIOService.on('fromAdmin', function(data) {

      $rootScope.sentMessage.push(data);

    })
}
