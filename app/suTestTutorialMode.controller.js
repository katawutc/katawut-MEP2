angular.module('app').controller('suTestTutorialModeCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                      'suTestQuestion',
                                      suTestTutorialModeCtrl]);

function suTestTutorialModeCtrl($scope, $http, $routeParams,
                          $window, $location, suTestQuestion) {

  // for displaying on 2nd nav bar
  $scope.testID = $window.sessionStorage.testID;

  // use for showing submit answer or next question button
  $scope.submitted = true;
  $scope.isSubmitted = function() {
    return $scope.submitted;
  }

  $scope.next = false;
  $scope.isNext = function() {
    return  $scope.next; /*!($scope.submitted);*/
  }

  // To control the test finish button
  $scope.testFinished = false;
  $scope.isTestFinished = function() {
    return $scope.testFinished;
  }

  /** handle suTestQuestion*/
  if (suTestQuestion) {
    console.log('receive su test question');
    console.log(suTestQuestion);

    $scope.question = suTestQuestion.question;
    $scope.choice1 = suTestQuestion.answerChoice[0];
    $scope.choice2 = suTestQuestion.answerChoice[1];
    $scope.choice3 = suTestQuestion.answerChoice[2];
    $scope.choice4 = suTestQuestion.answerChoice[3];

  }

}
