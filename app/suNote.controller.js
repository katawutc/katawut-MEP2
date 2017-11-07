angular.module('app')
.controller('suNoteCtrl',
           ['$scope', '$http', '$routeParams',
            '$window', '$location', '$q',
            'suSecondNavBarMessageService',
            'suNote',
            'suNoteListService',
             suNoteCtrl]);

function suNoteCtrl($scope, $http, $routeParams,
                    $window, $location, $q,
                    suSecondNavBarMessageService,
                    suNote,
                    suNoteListService) {

    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

    if (suNote) {

      $scope.noteTitle = suNote.title;
      $scope.noteContent = suNote.note;

      var noteDate = parseInt(suNote.noteTime);
      $scope.noteDate = (new Date(noteDate)).toString();

    }

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู '+suNote.title;
    suSecondNavBarMessageService.setMessage(message);


    $scope.editNote = function() {

      console.log('edit note');

      var editSuNotePath = '/editSuNote/'+$window.sessionStorage.userID+'/'+
                            $scope.noteTitle+'/'+
                            parseInt(suNote.noteTime);

      console.log(editSuNotePath);

      $location.path(editSuNotePath);

    }

    $scope.deleteNote = function() {

      console.log('delete note');
      /**
        * to open a modal dialog to confirm the deletion
        */


        var deleteSuNoteUrl = '/deleteSuNote/'+$window.sessionStorage.userID+'/'+
                               $scope.noteTitle+'/'+
                               parseInt(suNote.noteTime);

        console.log(deleteSuNoteUrl);

        var deferred = $q.defer();

        $http({
          method: 'GET',
          url: deleteSuNoteUrl,
          headers: {
            'Authorization': 'JWT ' + $window.sessionStorage.token
            }
        }).then(function successCallback(response) {
          deferred.resolve(response.data);

          console.log(response);

          if(response.data === 'delete success') {
            $location.path('/noteList/su/'+$window.sessionStorage.userID);
          }

        },function errorCallback(response){

        });
        return  deferred.promise;

    }
}
