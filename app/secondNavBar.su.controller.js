angular.module('app')
.controller('secondNavBarSuCtrl',
           ['$scope', '$rootScope',
            '$window',
            'suSecondNavBarMessageService',
            'socketService',
             secondNavBarSuCtrl]);

function secondNavBarSuCtrl($scope, $rootScope,
                            $window,
                            suSecondNavBarMessageService,
                            socketService) {

  // shoe chat and note panels should ne $rootScope ?
  $rootScope.showNotePanel  = true;
  $scope.showChatPanel = false;

  $scope.openChatPanel = function() {

    $scope.showChatPanel = !$scope.showChatPanel;

    $window.document.getElementById('chatPanel-message-input').focus();
  }

  $rootScope.openNotePanel = function() {

    $rootScope.showNotePanel = !$rootScope.showNotePanel;
  }

  $rootScope.newNote = function() {

    console.log('create a new note');
  }

  // send chat message
  $scope.sentMessage = [];

  $scope.sendMessage = function() {
      console.log('send chat message');
      console.log($scope.message);


      var message = {'userID': $window.sessionStorage.userID,
                     'userRole': $window.sessionStorage.userRole,
                     'sentTime': Date.now(),
                     'message': $scope.message}

      socketService.emit('chat', message);

      $scope.sentMessage.push('You: '+$scope.message);

      $scope.message = null;
  }

  socketService.on('chatRoom', function(message) {

    console.log(message);
    $scope.sentMessage.push(message);
  })
}
