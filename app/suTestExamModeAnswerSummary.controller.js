angular.module('app').controller('suTestExamModeAnswerSummaryCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location', 'suTestExamModeAnswerSummary',
                                      suTestExamModeAnswerSummaryCtrl]);

function suTestExamModeAnswerSummaryCtrl($scope, $http, $routeParams,
                                          $window, $location, suTestExamModeAnswerSummary) {

  $scope.userID = $window.sessionStorage.userID;
  $scope.suTestStartAt = $window.sessionStorage.suTestStartAt;

  $scope.suTestID = $window.sessionStorage.suTestID;

  // to implement text color on suTestQuestionStatus
  $scope.result = suTestExamModeAnswerSummary;

  $scope.endExam = function() {

    var suTestSummaryUrl = '/suTestSummary/'+$window.sessionStorage.userID+'/'+
                            $window.sessionStorage.suTestID+'/'+
                            $window.sessionStorage.suTestMode+'/'+
                            $window.sessionStorage.suTestStartAt;

    $location.path(suTestSummaryUrl);
  }
}
