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

      $rootScope.noteTimeStart = Date.now();

      console.log($rootScope.noteTimeStart);

      // what to do when closing the note panel

      //console.log($rootScope.quickNote);

      //socketService.emit('suNote', $rootScope.quickNote);
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

    $scope.title = '';
    $scope.note = '';

    $scope.setFocusNoteTitle();

    $rootScope.noteTimeStart = Date.now();

    console.log($rootScope.noteTimeStart);

  }
}
