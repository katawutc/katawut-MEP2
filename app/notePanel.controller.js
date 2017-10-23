angular.module('app')
.controller('notePanelCtrl',
            ['$rootScope', notePanelCtrl]);

function notePanelCtrl($rootScope) {

  //$rootScope.showNotePanel  = false;

  console.log('at notePanelCtrl');

  console.log($rootScope.showNotePanel);

  $rootScope.openNotePanel = function() {

    $rootScope.showNotePanel = !$rootScope.showNotePanel;
  }

}
