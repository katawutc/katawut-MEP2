angular.module('app').controller('testSummaryUnSubscribeUserCtrl',
                                  testSummaryUnSubscribeUserCtrl);

function testSummaryUnSubscribeUserCtrl ($scope, $http, $routeParams, $window, $location) {

  var urlScore = '/getTestScoreUnSubscribeUser/'+$window.sessionStorage.userID+
                    '/'+$window.sessionStorage.testID+
                    '/'+$window.sessionStorage.testMode+
                    '/'+$window.sessionStorage.testStartAt;

  $http({
  url: urlScore,
  method: 'GET'
    }).then(function successCallback(response) {
        $scope.score = response.data;
    }, function errorCallback(response) {
  });

  var urlSummary = '/getTestSummaryUnSubscribeUser/'+$window.sessionStorage.userID+
                    '/'+$window.sessionStorage.testID+
                    '/'+$window.sessionStorage.testMode+
                    '/'+$window.sessionStorage.testStartAt;

  $http({
  url: urlSummary,
  method: 'GET'
    }).then(function successCallback(response) {
        //$scope.score = response.data.score;
        $scope.result = response.data;
    }, function errorCallback(response) {
  });
}
