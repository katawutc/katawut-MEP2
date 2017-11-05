angular.module('app')
.controller('testSummaryExamModeCtrl',
           ['$scope',
            'examScore', 'examSummary',
             testSummaryExamModeCtrl]);

function testSummaryExamModeCtrl($scope, examScore, examSummary) {
  
  $scope.score = examScore;
  $scope.result = examSummary;
}
