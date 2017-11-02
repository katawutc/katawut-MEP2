angular.module('app')
.controller('accountSettingSuCtrl',
           ['$scope', '$window',
             accountSettingSuCtrl]);

function accountSettingSuCtrl ($scope, $window) {

    $scope.userID = $window.sessionStorage.userID;

  }
