angular.module('app').controller('articleListSuCtrl',
  ['$scope', '$http', '$routeParams', '$window', '$location',
                                  articleListSuCtrl]);

function articleListSuCtrl ($scope, $http, $routeParams, $window,
                                $location) {

    $scope.userID = $window.sessionStorage.userID;

  }
