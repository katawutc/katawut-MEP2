angular.module('app')
.controller('createSuNoteCtrl',
           ['$scope', '$window', '$timeout',
            'suSecondNavBarMessageService', 'socketService',
             createSuNoteCtrl]);

function createSuNoteCtrl ($scope, $window, $timeout,
                           suSecondNavBarMessageService, socketService) {

  console.log('at createSuNoteCtrl');

  /** set suSecondNavBarMessage */
  var message = 'Create a new note: ';
  suSecondNavBarMessageService.setMessage(message);
  /** */

  // set focus on note title input
  $scope.showCreateSuNote = true;

  var noteTimeStart = Date.now();


  $scope.saveNote = function() {

    console.log('at createSuNoteCtrl: saveNote');

    var suNote = {'userID': $window.sessionStorage.userID,
                  'title': $scope.title,
                  'note': $scope.note,
                  'noteTimeStart': noteTimeStart,
                  'noteTime': Date.now()
                  }

    message = 'Create a new note: '+ $scope.title;
    suSecondNavBarMessageService.setMessage(message);

    console.log(message);

    console.log(suNote);

    socketService.emit('createSuNote', suNote);

    $scope.createNoteSave = true;

    $timeout(function(){
                $scope.createNoteSave = false;
              }, 1000);
  }

  // override the $rootScope.openNotePanel
  $scope.openNotePanel = function() {

    console.log('create a new note at createSuNote');

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
