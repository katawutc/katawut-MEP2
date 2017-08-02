angular.module('app').controller('reviewUnSubscribeTestCtrl', reviewUnSubscribeTestCtrl)

function reviewUnSubscribeTestCtrl($scope, $http, $routeParams, $window, $location) {

  var url = '/reviewUnSubscribeTest/'+$routeParams.testID+'/'+$routeParams.questionNumber;

  $http({
  url: url,
  method: 'GET',
  }).then(function successCallback(response) {
    $scope.questionNumber = response.data.solQuestionNumber;
    $scope.question = response.data.question;
    $scope.solution = response.data.solution;
    $scope.explanation = response.data.explanation;
  }, function errorCallback(response) {
    console.log(response.data);
  });

  $scope.routeToTestSummaryUnSubscribeUser = function() {
    $location.path('/testSummaryUnSubscribeUser');
  }
}
