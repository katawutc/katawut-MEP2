angular.module('app')
.controller('suNoteListCtrl',
           ['$scope', '$http', '$routeParams', '$window',
            '$location',
            'suSecondNavBarMessageService',
            'suNoteList',
             suNoteListCtrl]);

function suNoteListCtrl ($scope, $http, $routeParams,
                         $window, $location,
                         suSecondNavBarMessageService,
                         suNoteList) {

    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู note list กัน';
    suSecondNavBarMessageService.setMessage(message);

    if (suNoteList) {

      console.log(suNoteList);

      console.log(suNoteList.length);

      for (var i =0; i<suNoteList.length; i++) {

        var notedate = parseInt(suNoteList[i].noteTime);
        suNoteList[i].noteTime = (new Date(notedate)).toString();

        console.log(suNoteList[i].noteTime);
      }

      console.log(suNoteList);
      $scope.noteList = suNoteList;

    }


  }
