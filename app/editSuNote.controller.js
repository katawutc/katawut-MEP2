angular.module('app')
.controller('editSuNoteCtrl',
           ['$scope', '$window', '$timeout',
            'suNote', 'suSecondNavBarMessageService', 'socketService',
             editSuNoteCtrl]);

function editSuNoteCtrl ($scope, $window, $timeout,
                         suNote, suSecondNavBarMessageService, socketService) {

  $scope.showEditSuNote = true;

  if (suNote) {

    $scope.title = suNote.title;

    $scope.note = suNote.note;

    $scope.noteTimeStart = suNote.noteTimeStart;

  }


  /** set suSecondNavBarMessage */
  var message = 'Note editing: '+ $scope.title;
  suSecondNavBarMessageService.setMessage(message);
  /** */

  $scope.saveNote = function() {

    if ($scope.title === '') { $scope.title = 'untitled';}

    var suNote = {'userID': $window.sessionStorage.userID,
                  'title': $scope.title,
                  'note': $scope.note,
                  'noteTimeStart': $scope.noteTimeStart,
                  'noteTime': Date.now()
                  }

    message = 'Note editing: '+ $scope.title;
    suSecondNavBarMessageService.setMessage(message);

    socketService.emit('editSuNote', suNote);

    // to display save notification
    $scope.createNoteSave = true;
    $timeout(function(){
                $scope.createNoteSave = false;
              }, 1000);
  }

  $scope.openNotePanel = function() {

    $scope.title = '';
    $scope.note = '';

    /** set suSecondNavBarMessage */
    var message = 'Create a new note: ';
    suSecondNavBarMessageService.setMessage(message);
    /** */

    // set focus on note title input
    $scope.setFocusNoteTitle(); // using rfocus
  }

}
