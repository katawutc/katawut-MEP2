angular.module('app').controller('reviewTestSolutionCtrl', reviewTestSolutionCtrl)

function reviewTestSolutionCtrl($scope, $http, $routeParams, $window, $location,
                                    reviewTestSolution) {

  $scope.questionNumber = reviewTestSolution.solQuestionNumber;
  $scope.question = reviewTestSolution.question;
  $scope.solution = reviewTestSolution.solution;
  $scope.explanation = reviewTestSolution.explanation;

  $scope.routeToTestSummaryExamMode = function() {
    $location.path('/testSummaryExamMode');
  }
}
