angular.module('app')
.controller('chatPanelCtrl',
            ['$rootScope', chatPanelCtrl]);

function chatPanelCtrl($rootScope) {

  console.log('at chatPanelCtrl');

  console.log($rootScope.showChatPanel);

  $rootScope.openChatPanel = function() {

    $rootScope.showChatPanel = !$rootScope.showChatPanel;
  }
}
