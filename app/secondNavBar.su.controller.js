angular.module('app').controller('secondNavBarSuCtrl',
                                  ['$scope', secondNavBarSuCtrl]);

function secondNavBarSuCtrl($scope) {

  $scope.showNotePanel = false;
  $scope.showChatPanel = false;

  $scope.openChatPanel = function() {

    $scope.showChatPanel = !$scope.showChatPanel;
    if ($scope.showChatPanel) {
      console.log('open chat panel');
    }
    else if (!$scope.showChatPanel) {
      console.log('close chat panel');
    }
  }

  $scope.openNotePanel = function() {

    $scope.showNotePanel = !$scope.showNotePanel;
    if ($scope.showNotePanel) {
      console.log('open note panel');
    }
    else if (!$scope.showNotePanel) {
      console.log('close note panel');
    }
  }

  // send chat message
  $scope.sendMessage = function() {
      console.log('send chat message');
      console.log($scope.message);
  }
}
