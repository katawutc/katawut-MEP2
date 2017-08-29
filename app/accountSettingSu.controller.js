angular.module('app').controller('accountSettingSuCtrl',
                                  accountSettingSuCtrl);

function accountSettingSuCtrl ($scope, $http, $routeParams, $window,
                                $location) {

    $scope.userID = $window.sessionStorage.userID;

  }
