angular.module('app')
.controller('answerSummaryCtrl',
           ['$scope', '$location', 'answerSummary',
             answerSummaryCtrl]);

function answerSummaryCtrl ($scope, $location, answerSummary) {
  
  $scope.result = answerSummary;

  /**
   * need to find way to display all the question number
   */

  $scope.endExam = function() {

    $location.path('/testSummaryExamMode');
  }
}
