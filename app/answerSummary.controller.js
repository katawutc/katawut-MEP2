angular.module('app').controller('answerSummaryCtrl',
                                  ['$scope', '$http',
                                  '$routeParams', '$window',
                                  '$location', 'answerSummary',
                                  answerSummaryCtrl]);

function answerSummaryCtrl ($scope, $http, $routeParams, $window,
                            $location, answerSummary) {
  $scope.result = answerSummary;

  /**
   * need to find way to display all the question number
   */

  $scope.endExam = function() {

    $location.path('/testSummaryExamMode');
  }
}
