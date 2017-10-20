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
                     'sentTime': Date.now(),
                     'message': $window.sessionStorage.userID+': '+ $scope.message}

      socketService.emit('chat', message);

      //$scope.sentMessage.push($scope.message);

      $scope.message = null;
  }

  socketService.on('chatRoom', function(message) {

    console.log(message);
    $scope.sentMessage.push(message);
  })
}
