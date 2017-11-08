angular.module('app')
.controller('suNoteCtrl',
           ['$scope', '$http',
            '$window', '$location', '$q', '$rootScope',
            'suSecondNavBarMessageService',
            'suNote',
            'suNoteListService',
             suNoteCtrl]);

function suNoteCtrl($scope, $http,
                    $window, $location, $q, $rootScope,
                    suSecondNavBarMessageService,
                    suNote,
                    suNoteListService) {

    // force close quick note panel
    $rootScope.showNotePanel = false;

    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

    if (suNote) {

      $scope.noteTitle = suNote.title;
      $scope.noteContent = suNote.note;

      var noteTime = parseInt(suNote.noteTime);
      $scope.noteTime = (new Date(noteTime)).toString();

    }

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู '+suNote.title;
    suSecondNavBarMessageService.setMessage(message);


    $scope.editNote = function() {

      var editSuNotePath = '/editSuNote/'+$window.sessionStorage.userID+'/'+
                            encodeURIComponent($scope.noteTitle)+'/'+
                            parseInt(suNote.noteTimeStart)+'/'+
                            parseInt(suNote.noteTime);

      $location.path(editSuNotePath);

    }

    $scope.deleteNote = function() {

        var deleteSuNoteUrl = '/deleteSuNote/'+$window.sessionStorage.userID+'/'+
                               encodeURIComponent($scope.noteTitle)+'/'+
                               parseInt(suNote.noteTimeStart)+'/'+
                               parseInt(suNote.noteTime);

        var deferred = $q.defer();

        $http({
          method: 'GET',
          url: deleteSuNoteUrl,
          headers: {
            'Authorization': 'JWT ' + $window.sessionStorage.token
            }
        }).then(function successCallback(response) {

          deferred.resolve(response.data);

          if(response.data === 'delete success') {
            $location.path('/noteList/su/'+$window.sessionStorage.userID);
          }

        },function errorCallback(response){

        });
        return  deferred.promise;

    }

    // to create a new note
    // override $rootScope.openNotePanel
    $scope.openNotePanel = function() {

      var createSuNoteUrl = 'createSuNote/'+$window.sessionStorage.userID;
      $location.path(createSuNoteUrl);
    }
}
