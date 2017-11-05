angular.module('app')
.controller('reviewTestSolutionCtrl',
           ['$scope', '$location',
            'reviewTestSolution',
             reviewTestSolutionCtrl])

function reviewTestSolutionCtrl($scope, $location, reviewTestSolution) {

  $scope.questionNumber = reviewTestSolution.solQuestionNumber;
  $scope.question = reviewTestSolution.question;
  $scope.solution = reviewTestSolution.solution;
  $scope.explanation = reviewTestSolution.explanation;

  $scope.routeToTestSummaryExamMode = function() {
    $location.path('/testSummaryExamMode');
  }
}
