angular.module('app')
.controller('secondNavBarSuCtrl',
           ['$scope', '$window',
            'suSecondNavBarMessageService',
            'socketService',
             secondNavBarSuCtrl]);

function secondNavBarSuCtrl($scope, $window,
                            suSecondNavBarMessageService,
                            socketService) {

  // shoe chat and note panels should ne $rootScope ?
  $scope.showNotePanel = false;
  $scope.showChatPanel = false;

  $scope.openChatPanel = function() {

    $scope.showChatPanel = !$scope.showChatPanel;
  }

  $scope.openNotePanel = function() {

    $scope.showNotePanel = !$scope.showNotePanel;
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
