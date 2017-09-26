angular.module('app').controller('suTestListCtrl',
  ['$scope', '$http', '$routeParams', '$window',
    '$location', suTestListCtrl]);

function suTestListCtrl ($scope, $http, $routeParams, $window,
                                $location) {

    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

  }
