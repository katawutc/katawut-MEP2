angular.module('app')
.controller('suNoteListCtrl',
           ['$scope', '$http', '$routeParams', '$window',
            '$location', '$rootScope',
            'suSecondNavBarMessageService',
            'suNoteList',
            'suNoteListService',
             suNoteListCtrl]);

function suNoteListCtrl ($scope, $http, $routeParams,
                         $window, $location, $rootScope,
                         suSecondNavBarMessageService,
                         suNoteList,
                         suNoteListService) {

    // force close quick note panel
    $rootScope.showNotePanel = false;

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
        suNoteList[i].noteTimeText = (new Date(notedate)).toString();

        console.log(suNoteList[i].noteTimeText);
      }

      console.log(suNoteList);
      $scope.noteList = suNoteList;

    }

    $scope.deleteNote = function(userID, title, noteTime) {

      console.log('delete note');

      console.log(userID);
      console.log(title);
      console.log(noteTime);

      suNoteListService.deleteSuNote(userID, title, noteTime);

    }

    $scope.viewNote = function(userID, title, noteTime) {

      var viewNoteUrl = '/suNote/'+userID+'/'+encodeURIComponent(title)+'/'+noteTime;
      console.log(viewNoteUrl);

      $location.path(viewNoteUrl);
    }

    // to create a new note
    // override $rootScope.openNotePanel
    $scope.openNotePanel = function() {

      console.log('route to create a new note path');
      var createSuNoteUrl = 'createSuNote/'+$window.sessionStorage.userID;
      $location.path(createSuNoteUrl);
    }

  }
