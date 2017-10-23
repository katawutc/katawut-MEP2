angular.module('app').directive('chatPanel', chatPanel);

function chatPanel() {
  return {
    templateUrl: 'chatPanel.html'
  };
}
