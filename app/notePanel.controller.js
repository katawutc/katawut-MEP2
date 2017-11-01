angular.module('app')
.controller('notePanelCtrl',
            ['$rootScope', '$scope', '$window',
             'socketService',
              notePanelCtrl]);

function notePanelCtrl($rootScope, $scope, $window, socketService) {

    $scope.title = $rootScope.quickNote.title;
    $scope.note = $rootScope.quickNote.note;

    // to implement notePanelService to help on new note etc

    $rootScope.openNotePanel = function() {

      $rootScope.showNotePanel = !$rootScope.showNotePanel;

      /** what to do when closing the note panel
        * 1. if no title and no content, set a new noteTimeStart
        * 2. if title or content, keep the current noteTimeStart
        */
      if (!$scope.title && !$scope.note) {

        $rootScope.noteTimeStart = Date.now();

        console.log($rootScope.noteTimeStart);
      }

      // save and update note every time when open or close the note panel
      console.log($rootScope.quickNote);
      socketService.emit('suNote', $rootScope.quickNote);
    }

    $rootScope.saveNote = function() {

    console.log('save note');

    $rootScope.quickNote = { userID: $window.sessionStorage.userID,
                             noteTimeStart: $rootScope.noteTimeStart,
                             noteTime: Date.now(),
                             title: $scope.title,
                             note: $scope.note }

    console.log($rootScope.quickNote);

    socketService.emit('suNote', $rootScope.quickNote);

  }

  $rootScope.newNote = function() {

    console.log('create a new note');

    console.log($rootScope.quickNote);
    socketService.emit('suNote', $rootScope.quickNote);

    $scope.title = '';
    $scope.note = '';

    $scope.setFocusNoteTitle();

    $rootScope.noteTimeStart = Date.now();

    console.log($rootScope.noteTimeStart);

    $rootScope.quickNote.noteTime = '';
    $rootScope.quickNote.title = '';
    $rootScope.quickNote.note = '';

  }
}
