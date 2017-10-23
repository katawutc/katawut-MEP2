
angular.module('app').directive('notePanel', notePanel);

function notePanel() {
  return {
    templateUrl: 'notePanel.html'
  };
}
