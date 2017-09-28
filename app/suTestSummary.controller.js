angular.module('app').controller('suTestSummaryCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                      suTestSummaryCtrl]);

function suTestSummaryCtrl($scope, $http, $routeParams,
                          $window, $location) {

  $scope.suTestID = $window.sessionStorage.suTestID;

}
