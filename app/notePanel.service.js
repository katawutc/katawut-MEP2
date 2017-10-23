angular.module('app')
.factory('notePanelService',
         ['$rootScope', notePanelService]);

function notePanelService($rootScope) {

  return {
    initializeNotePanel : function() {

      console.log('at notePanelService: initializeNotePanel');

      $rootScope.showNotePanel = false;

      return 'initializeNotePanel success';
    }
  }
}
