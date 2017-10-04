angular.module('app').controller('suTestHistoryCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                      suTestHistoryCtrl]);

function suTestHistoryCtrl($scope, $http, $routeParams,
                          $window, $location) {

  $scope.userName = $window.sessionStorage.userName;


}
