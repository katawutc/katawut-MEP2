angular.module('app')
.controller('secondNavBarAdCtrl',
           ['$scope', '$window', '$rootScope',
            'chatIOService', 'chatAdminService',
             secondNavBarAdCtrl]);

function secondNavBarAdCtrl($scope, $window, $rootScope,
                            chatIOService, chatAdminService) {

  $rootScope.openChatPanel = function() {

    $rootScope.showChatPanel = !$rootScope.showChatPanel;
  }

  $rootScope.openNotePanel = function() {

    $rootScope.showNotePanel = !$rootScope.showNotePanel;
  }


  // send chat message
  $scope.sentMessage = [];

  $scope.sendMessage = function() {
      console.log('send chat message');
      console.log($scope.message);


      var message = {'userID': $window.sessionStorage.userID,
                     'adminChatTo': chatAdminService.getUserToChat(),
                     'userRole': $window.sessionStorage.userRole,
                     'sentTime': Date.now(),
                     'message': $scope.message}

      console.log(message);

      //socketService.emit('chat', message);

      var event = chatAdminService.getUserToChat();
      console.log(event);

      chatIOService.emit('chat', message);

      $scope.sentMessage.push('Admin: '+$scope.message);

      $scope.message = null;
  }

  console.log('before chatIOService.on');
  console.log(chatAdminService.getUserToChat());

  chatIOService.on(chatAdminService.getUserToChat(), function(message) {

    console.log(message);
    $scope.sentMessage.push(message);
  })

/*
  socketService.on('chatRoom', function(message) {

    console.log(message);
    $scope.sentMessage.push(message);
  })
  */

}
