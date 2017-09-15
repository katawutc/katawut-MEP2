angular.module('app').controller('accountSettingSuCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location', accountSettingSuCtrl]);

function accountSettingSuCtrl ($scope, $http, $routeParams, $window,
                                $location) {

    $scope.userID = $window.sessionStorage.userID;

  }
