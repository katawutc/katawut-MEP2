angular.module('app')
.controller('suNoteCtrl',
           ['$scope', '$http', '$routeParams',
            '$window', '$location',
            'suSecondNavBarMessageService',
            'suNote',
             suNoteCtrl]);

function suNoteCtrl($scope, $http, $routeParams,
                    $window, $location, suSecondNavBarMessageService,
                    suNote) {


    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

    if (suNote) {

      console.log(suNote);

      $scope.noteTitle = suNote.title;
      $scope.noteContent = suNote.note;

      var noteDate = parseInt(suNote.noteTime);
      $scope.noteDate = (new Date(noteDate)).toString();

    }

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู '+suNote.title;
    suSecondNavBarMessageService.setMessage(message);



}
