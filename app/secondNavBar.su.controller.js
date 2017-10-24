angular.module('app')
.controller('secondNavBarSuCtrl',
           ['$scope', '$rootScope',
            '$window',
            '$document',
            'suSecondNavBarMessageService',
            'socketService',
             secondNavBarSuCtrl]);

function secondNavBarSuCtrl($scope, $rootScope,
                            $window,
                            $document,
                            suSecondNavBarMessageService,
                            socketService) {

  $rootScope.openChatPanel = function() {

    $rootScope.showChatPanel = !rootScope.showChatPanel;
  }

  $rootScope.openNotePanel = function() {

    $rootScope.showNotePanel = !$rootScope.showNotePanel;
  }
}
