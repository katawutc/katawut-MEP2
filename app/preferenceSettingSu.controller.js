angular.module('app').controller('preferenceSettingSuCtrl',
                                  preferenceSettingSuCtrl);

function preferenceSettingSuCtrl ($scope, $http, $routeParams, $window,
                                $location) {

    $scope.userID = $window.sessionStorage.userID;

  }
