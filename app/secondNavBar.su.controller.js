angular.module('app')
.controller('secondNavBarSuCtrl',
           ['$scope',
            'suSecondNavBarMessageService',
            'socketService',
             secondNavBarSuCtrl]);

function secondNavBarSuCtrl($scope,
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
  $scope.sendMessage = function() {
      console.log('send chat message');
      console.log($scope.message);


      socketService.emit('chat', $scope.message);

      $scope.message = null;
  }
}
