angular.module('app').controller('answerSummaryCtrl',
                                  answerSummaryCtrl);

function answerSummaryCtrl ($scope, $http, $routeParams, $window,
                            $location, answerSummary) {
  $scope.result = answerSummary;
}
