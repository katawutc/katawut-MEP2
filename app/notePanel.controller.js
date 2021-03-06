angular.module('app')
.controller('notePanelCtrl',
            ['$rootScope', '$scope', '$window', '$timeout',
             'socketService',
              notePanelCtrl]);

function notePanelCtrl($rootScope, $scope, $window, $timeout,
                        socketService) {

    $scope.title = $rootScope.quickNote.title;
    $scope.note = $rootScope.quickNote.note;

    // to implement notePanelService to help on new note etc

    $rootScope.openNotePanel = function() {

      $rootScope.showNotePanel = !$rootScope.showNotePanel;

      /** what to do when closing the note panel
        * 1. if no title and no content, set a new noteTimeStart
        * 2. if title or content, keep the current noteTimeStart
        */
      //if (!$scope.title || !$scope.note) {

      $rootScope.noteTimeStart = Date.now();

      //}

      // save and update note every time when open or close the note panel
      socketService.emit('suNote', $rootScope.quickNote);
    }

    $rootScope.saveNote = function() {

      //if ($scope.title === '') { $scope.title = 'untitled';}

      $rootScope.quickNote = { 'userID': $window.sessionStorage.userID,
                               'noteTimeStart': $rootScope.noteTimeStart,
                               'noteTime': Date.now(),
                               'title': $scope.title,
                               'note': $scope.note,
                               'newNote': true}

      socketService.emit('suNote', $rootScope.quickNote);

      // to display save notification
      $scope.quickNoteSave = true;
      $timeout(function(){
                  $scope.quickNoteSave = false;
                }, 1000);

  }

  $rootScope.newNote = function() {

    socketService.emit('suNote', $rootScope.quickNote);

    $scope.title = '';
    $scope.note = '';

    // to display save notification
    $scope.quickNoteSave = true;
    $timeout(function(){
                $scope.quickNoteSave = false;
              }, 1000);

    $scope.setFocusNoteTitle(); // using rfocus

    $rootScope.quickNote.noteTimeStart = Date.now();

    $rootScope.quickNote.noteTime = '';
    $rootScope.quickNote.title = '';
    $rootScope.quickNote.note = '';

  }
}
