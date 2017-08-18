angular.module('app').controller('testSummaryExamModeCtrl',
                                  testSummaryExamModeCtrl);

function testSummaryExamModeCtrl($scope, $http, $routeParams, $window, $location,
                                  examScore, examSummary) {
  $scope.score = examScore;
  $scope.result = examSummary;
}
