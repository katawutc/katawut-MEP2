angular.module('app').controller('suTestSummaryCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'suTestSummary', 'suTestScore',
                                     suTestSummaryCtrl]);

function suTestSummaryCtrl($scope, $http, $routeParams,
                          $window, $location, suTestSummary, suTestScore) {

  var retakeTestUrl;

  if(suTestSummary && suTestSummary[0]) {
    $scope.suTestID = suTestSummary[0].suTestID;
    $scope.suTestMode = suTestSummary[0].suTestMode;
    var suTestStartAt = parseInt(suTestSummary[0].suTestStartAt);
    $scope.suTestStartAt = (new Date(suTestStartAt)).toString();
  }

  if(suTestSummary) {
    $scope.result = suTestSummary;

    retakeTestUrl = '/suNewTest/'+$window.sessionStorage.userID+'/'+
                    suTestSummary[0].testID+'/'+
                    suTestSummary[0].suTestNumber;

  }

  if(suTestScore) {
    $scope.suTestScore = suTestScore;
  }

  // retake the test
  $scope.retakeTest = function()
  {
    console.log('go to retake the test');
    console.log(retakeTestUrl);
    $location.path(retakeTestUrl);
  }
}
