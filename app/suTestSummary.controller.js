angular.module('app').controller('suTestSummaryCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location', 'suTestSummary',
                                      suTestSummaryCtrl]);

function suTestSummaryCtrl($scope, $http, $routeParams,
                          $window, $location, suTestSummary) {

  $scope.suTestID = suTestSummary[0].suTestID;
  $scope.suTestMode = suTestSummary[0].suTestMode;
  $scope.suTestStartAt = Date(suTestSummary[0].suTestStartAt).toString();

  if(suTestSummary) {

    console.log(suTestSummary);
    $scope.result = suTestSummary;
  }
}
