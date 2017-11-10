angular.module('app')
.controller('secondNavBarSuCtrl',
           ['$rootScope',
            'suSecondNavBarMessageService',
             secondNavBarSuCtrl]);

function secondNavBarSuCtrl($rootScope,
                            suSecondNavBarMessageService) {

  $rootScope.openChatPanel = function() {

    console.log('open su chat panel');

    $rootScope.showChatPanel = !$rootScope.showChatPanel;
  }

  $rootScope.openNotePanel = function() {

    $rootScope.showNotePanel = !$rootScope.showNotePanel;
  }
}
