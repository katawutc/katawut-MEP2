angular.module('app')
.controller('editSuNoteCtrl',
           ['$scope',
            'suNote',
             editSuNoteCtrl]);

function editSuNoteCtrl ($scope, suNote) {


  console.log('at editSuNoteCtrl');

  console.log(suNote);

  $scope.showEditSuNote = true;

  $scope.title = suNote.title;

  $scope.note = suNote.note;

}
