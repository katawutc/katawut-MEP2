angular.module('app').controller('testListSuCtrl',
  ['$scope', '$http', '$routeParams', '$window',
    '$location', testListSuCtrl]);

function testListSuCtrl ($scope, $http, $routeParams, $window,
                                $location) {

    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

  }
