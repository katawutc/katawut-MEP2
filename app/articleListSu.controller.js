angular.module('app').controller('articleListSuCtrl',
                                  articleListSuCtrl);

function articleListSuCtrl ($scope, $http, $routeParams, $window,
                                $location) {

    $scope.userID = $window.sessionStorage.userID;

  }
