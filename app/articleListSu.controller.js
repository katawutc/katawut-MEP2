angular.module('app')
.controller('articleListSuCtrl',
           ['$scope', '$window',
             articleListSuCtrl]);

function articleListSuCtrl ($scope, $window) {

    $scope.userID = $window.sessionStorage.userID;

  }
