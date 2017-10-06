angular.module('app').controller('suTestSummaryCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'suTestSummary', 'suTestScore',
                                     suTestSummaryCtrl]);

function suTestSummaryCtrl($scope, $http, $routeParams,
                          $window, $location, suTestSummary, suTestScore) {

  console.log('at suTestSummaryCtrl');
  console.log(suTestSummary);

  if(suTestSummary && suTestSummary[0]) {
    $scope.suTestID = suTestSummary[0].suTestID;
    $scope.suTestMode = suTestSummary[0].suTestMode;
    var suTestStartAt = parseInt(suTestSummary[0].suTestStartAt);
    $scope.suTestStartAt = (new Date(suTestStartAt)).toString();
  }

  if(suTestSummary) {
    $scope.result = suTestSummary;
  }

  if(suTestScore) {
    $scope.suTestScore = suTestScore;
  }
}
