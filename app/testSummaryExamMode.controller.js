angular.module('app').controller('testSummaryExamModeCtrl',
                                  testSummaryExamModeCtrl);

function testSummaryExamModeCtrl($scope, $http, $routeParams, $window, $location,
                                  examScore) {

  $scope.score = examScore;

}
