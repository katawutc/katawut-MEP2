angular.module('app')
.controller('reviewUnSubscribeTestCtrl',
           ['$scope', '$location',
            'reviewUnSubscribeTest',
             reviewUnSubscribeTestCtrl])

function reviewUnSubscribeTestCtrl($scope, $location,
                                   reviewUnSubscribeTest) {

  $scope.questionNumber = reviewUnSubscribeTest.solQuestionNumber;
  $scope.question = reviewUnSubscribeTest.question;
  $scope.solution = reviewUnSubscribeTest.solution;
  $scope.explanation = reviewUnSubscribeTest.explanation;

  $scope.routeToTestSummaryUnSubscribeUser = function() {
    $location.path('/testSummaryUnSubscribeUser');
  }
}
