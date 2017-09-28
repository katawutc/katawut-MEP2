angular.module('app').controller('suTestSummaryCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'suTestSummary', 'suTestScore',
                                     suTestSummaryCtrl]);

function suTestSummaryCtrl($scope, $http, $routeParams,
                          $window, $location, suTestSummary, suTestScore) {

  $scope.suTestID = suTestSummary[0].suTestID;
  $scope.suTestMode = suTestSummary[0].suTestMode;
  var suTestStartAt = parseInt(suTestSummary[0].suTestStartAt);
  $scope.suTestStartAt = (new Date(suTestStartAt)).toString();

  if(suTestSummary) {

    $scope.result = suTestSummary;
  }

  if(suTestScore) {

    $scope.suTestScore = suTestScore;
  }
}
