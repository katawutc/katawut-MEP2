angular.module('app')
.controller('editSuNoteCtrl',
           ['$scope', '$window', '$timeout',
            'suNote', 'suSecondNavBarMessageService', 'socketService',
             editSuNoteCtrl]);

function editSuNoteCtrl ($scope, $window, $timeout,
                         suNote, suSecondNavBarMessageService, socketService) {

  console.log('at editSuNoteCtrl');

  console.log(suNote);

  $scope.showEditSuNote = true;

  if (suNote) {

    $scope.title = suNote.title;

    $scope.note = suNote.note;

    $scope.noteTime = suNote.noteTime;
  }


  /** set suSecondNavBarMessage */
  var message = 'Note editing: '+ $scope.title;
  suSecondNavBarMessageService.setMessage(message);
  /** */

  $scope.saveNote = function() {

    console.log('at editSuNoteCtrl: saveNote');

    var suNote = {'userID': $window.sessionStorage.userID,
                  'title': $scope.title,
                  'note': $scope.note,
                  'previousNoteTime': $scope.noteTime,
                  'newNoteTime': Date.now()
                  }

    message = 'Note editing: '+ $scope.title;
    suSecondNavBarMessageService.setMessage(message);

    console.log(message);

    console.log(suNote);

    socketService.emit('editSuNote', suNote);

    // to display save notification
    $scope.createNoteSave = true;
    $timeout(function(){
                $scope.createNoteSave = false;
              }, 1000);
  }

}
