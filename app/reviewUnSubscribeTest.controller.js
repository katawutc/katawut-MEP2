angular.module('app').controller('reviewUnSubscribeTestCtrl', reviewUnSubscribeTestCtrl)

function reviewUnSubscribeTestCtrl($scope, $http, $routeParams, $window, $location,
                                    reviewUnSubscribeTest) {

  $scope.questionNumber = reviewUnSubscribeTest.solQuestionNumber;
  $scope.question = reviewUnSubscribeTest.question;
  $scope.solution = reviewUnSubscribeTest.solution;
  $scope.explanation = reviewUnSubscribeTest.explanation;

  $scope.routeToTestSummaryUnSubscribeUser = function() {
    $location.path('/testSummaryUnSubscribeUser');
  }
}
