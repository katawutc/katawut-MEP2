angular.module('app')
.factory('notePanelService',
         ['$rootScope', notePanelService]);

function notePanelService($rootScope) {

  return {
    initializeNotePanel : function() {

      console.log('at notePanelService: initializeNotePanel');

      $rootScope.showNotePanel = false;

      $rootScope.noteTitle = '';
      $rootScope.noteNote = '';

      $rootScope.quickNote = {title: $rootScope.noteTitle,
                              note: $rootScope.noteNote}

      return 'initializeNotePanel success';
    }
  }
}
