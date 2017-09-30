angular.module('app').controller('secondNavBarSuCtrl',
                                  ['$scope', secondNavBarSuCtrl]);

function secondNavBarSuCtrl($scope) {

  $scope.openChatPanel = function() {
    console.log('open chat panel');
  }

  $scope.openNotePanel = function() {
        console.log('open note panel');
  }
}
