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

    /** reset quickNote $rootScope */
    $rootScope.noteTimeStart = '';
    $rootScope.quickNote.noteTime = '';
    $rootScope.quickNote.title = '';
    $rootScope.quickNote.note = '';
    /** */

    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู note list กัน';
    suSecondNavBarMessageService.setMessage(message);

    if (suNoteList) {

      for (var i =0; i<suNoteList.length; i++) {

        var notedate = parseInt(suNoteList[i].noteTime);
        suNoteList[i].noteTimeText = (new Date(notedate)).toString();

      }

      $scope.noteList = suNoteList;

    }

    $scope.deleteNote = function(userID, title, noteTimeStart, noteTime) {

      suNoteListService.deleteSuNote(userID, title, noteTimeStart, noteTime);

    }

    $scope.viewNote = function(userID, title, noteTimeStart, noteTime) {

      var viewNoteUrl = '/suNote/'+userID+'/'+
                          encodeURIComponent(title)+'/'+
                          noteTimeStart+'/'+
                          noteTime;

      $location.path(viewNoteUrl);
    }

    // to create a new note
    // override $rootScope.openNotePanel
    $scope.openNotePanel = function() {

      var createSuNoteUrl = 'createSuNote/'+$window.sessionStorage.userID;
      $location.path(createSuNoteUrl);
    }

  }
