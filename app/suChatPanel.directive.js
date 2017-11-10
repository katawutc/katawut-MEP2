angular.module('app')
.directive('suChatPanel', suChatPanel);

function suChatPanel() {
  return {
    templateUrl: 'suChatPanel.html'
  };
}
