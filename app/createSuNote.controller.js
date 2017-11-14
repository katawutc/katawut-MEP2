angular.module('app')
.controller('createSuNoteCtrl',
           ['$scope', '$window', '$timeout',
            'suSecondNavBarMessageService', 'socketService',
             createSuNoteCtrl]);

function createSuNoteCtrl ($scope, $window, $timeout,
                           suSecondNavBarMessageService, socketService) {

  /** set suSecondNavBarMessage */
  var message = 'Create a new note: ';
  suSecondNavBarMessageService.setMessage(message);
  /** */

  // set focus on note title input
  $scope.showCreateSuNote = true;

  var noteTimeStart = Date.now();

  $scope.saveNote = function() {

    if ($scope.title === undefined) {
      $scope.title = 'untitled';
    }

    var suNote = {'userID': $window.sessionStorage.userID,
                  'title': $scope.title,
                  'note': $scope.note,
                  'noteTimeStart': noteTimeStart,
                  'noteTime': Date.now()
                  }

    message = 'Create a new note: '+ $scope.title;
    suSecondNavBarMessageService.setMessage(message);

    socketService.emit('createSuNote', suNote);

    // to display save notification
    $scope.createNoteSave = true;
    $timeout(function(){
                $scope.createNoteSave = false;
              }, 1000);
  }

  // override the $rootScope.openNotePanel
  // to open a new note to create
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
