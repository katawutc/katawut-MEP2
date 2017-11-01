angular.module('app')
.controller('notePanelCtrl',
            ['$rootScope', '$scope',
              notePanelCtrl]);

function notePanelCtrl($rootScope, $scope) {

    $scope.title = $rootScope.quickNote.title;
    $scope.note = $rootScope.quickNote.note;

    $rootScope.openNotePanel = function() {

      $rootScope.showNotePanel = !$rootScope.showNotePanel;
    }

    $rootScope.saveNote = function() {

    console.log('save note');

    $rootScope.quickNote = { title: $scope.title,
                             note: $scope.note}

    console.log($rootScope.quickNote);

  }

  $rootScope.newNote = function() {

    console.log('create a new note');

    $scope.title = '';
    $scope.note = '';

    $scope.setFocusNoteTitle();

  }
}
