angular.module('app').controller('answerSummaryCtrl',
                                  answerSummaryCtrl);

function answerSummaryCtrl ($scope, $http, $routeParams, $window,
                            $location, answerSummary) {
  $scope.result = answerSummary;

  /**
   * need to find way to display all the question number
   */

  $scope.endExam = function() {
    console.log('end the exam, and check the answer');
    $location.path('/testSummaryExamMode');
  }
}
