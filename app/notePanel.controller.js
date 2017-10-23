angular.module('app')
.controller('notePanelCtrl',
            ['$rootScope', notePanelCtrl]);

function notePanelCtrl($rootScope) {

  $rootScope.openNotePanel = function() {

    $rootScope.showNotePanel = !$rootScope.showNotePanel;
  }

}
