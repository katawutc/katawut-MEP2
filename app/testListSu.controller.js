angular.module('app').controller('testListSuCtrl',
                                  testListSuCtrl);

function testListSuCtrl ($scope, $http, $routeParams, $window,
                                $location) {

    $scope.userID = $window.sessionStorage.userID;

  }
