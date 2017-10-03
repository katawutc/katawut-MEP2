angular.module('app').controller('suTestExamModeAnswerSummaryCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location', 'suTestExamModeAnswerSummary',
                                      suTestExamModeAnswerSummaryCtrl]);

function suTestExamModeAnswerSummaryCtrl($scope, $http, $routeParams,
                          $window, $location, suTestExamModeAnswerSummary) {

  $scope.userID = $window.sessionStorage.userID;
  $scope.suTestStartAt = $window.sessionStorage.suTestStartAt;

  $scope.suTestID = $window.sessionStorage.suTestID;

  $scope.result = suTestExamModeAnswerSummary;

  $scope.endExam = function() {
    console.log('at suTestExamModeAnswerSummaryCtrl end the exam');

    var suTestSummaryUrl = '/suTestSummary/'+$window.sessionStorage.userID+'/'+
                            $window.sessionStorage.suTestID+'/'+
                            $window.sessionStorage.suTestMode+'/'+
                            $window.sessionStorage.suTestStartAt;

    $location.path(suTestSummaryUrl);

  }
}
