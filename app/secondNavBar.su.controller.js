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

  $rootScope.openChatPanel = function() {

    $rootScope.showChatPanel = !rootScope.showChatPanel;

    $window.document.getElementById('chatPanel-message-input').focus();
  }

  $rootScope.openNotePanel = function() {

    $rootScope.showNotePanel = !$rootScope.showNotePanel;
  }
}
