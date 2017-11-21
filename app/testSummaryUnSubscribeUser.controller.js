angular.module('app')
.controller('testSummaryUnSubscribeUserCtrl',
           ['$scope',
            'testScore', 'testSummary',
             testSummaryUnSubscribeUserCtrl]);

function testSummaryUnSubscribeUserCtrl ($scope,
                                         testScore, testSummary) {

  $scope.score = testScore;

  $scope.result = testSummary;

}
