angular.module('app')
.directive('adChatPanel', adChatPanel);

function adChatPanel() {
  return {
    templateUrl: 'adChatPanel.html'
  };
}
