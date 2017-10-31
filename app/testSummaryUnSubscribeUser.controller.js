angular.module('app')
.controller('testSummaryUnSubscribeUserCtrl',
           ['$scope',
            'testScore', 'testSummary',
             testSummaryUnSubscribeUserCtrl]);

function testSummaryUnSubscribeUserCtrl ($scope, $http, $routeParams, $window, $location,
                                          testScore, testSummary) {
  $scope.score = testScore;

  $scope.result = testSummary;

}
