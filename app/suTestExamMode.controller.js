angular.module('app').controller('suTestExamModeCtrl',
                                  ['$scope', '$http', '$route',
                                    '$window', '$location', 'suTestQuestion',
                                      suTestExamModeCtrl]);

function suTestExamModeCtrl($scope, $http, $route,
                          $window, $location, suTestQuestion) {

  // for displaying on 2nd nav bar
  $scope.suTestID = $window.sessionStorage.suTestID;

  /** handle suTestQuestion*/
  if (suTestQuestion) {

    console.log(suTestQuestion);

    $scope.testID = suTestQuestion.testID; // testID not suTestID
    $scope.suTestQuestionNumber = $route.current.params.suTestQuestionNumber;
    $scope.suTestSize = $window.sessionStorage.suTestSize;
    $scope.questionNumber = suTestQuestion.questionNumber; // testID questionNumber
    $scope.question = suTestQuestion.question;
    $scope.choice1 = suTestQuestion.answerChoice[0];
    $scope.choice2 = suTestQuestion.answerChoice[1];
    $scope.choice3 = suTestQuestion.answerChoice[2];
    $scope.choice4 = suTestQuestion.answerChoice[3];

  }

  // for navigation to the next question
  var suTestCurrentQuestionNumber = $route.current.params.suTestQuestionNumber;

}
