angular.module('app').controller('reviseSuTestExamAnswerSheetCtrl',
                                  ['$scope', '$http', '$route',
                                    '$window', '$location',
                                      'currentUserAnswer', 'currentExamQuestion',
                                        reviseSuTestExamAnswerSheetCtrl]);

function reviseSuTestExamAnswerSheetCtrl($scope, $http, $route,
                                          $window, $location,
                                          currentUserAnswer, currentExamQuestion) {

  $scope.suTestID = $window.sessionStorage.suTestID;

  console.log('at reviseSuTestExamAnswerSheetCtrl');

  console.log(currentUserAnswer);

  console.log(currentExamQuestion);

  /** handle currentExamQuestion */
  if (currentExamQuestion) {

    $scope.suTestQuestionNumber = $route.current.params.suTestQuestionNumber;
    $scope.suTestSize = $window.sessionStorage.suTestSize;
    $scope.question = currentExamQuestion.question;
    $scope.choice1 = currentExamQuestion.answerChoice[0];
    $scope.choice2 = currentExamQuestion.answerChoice[1];
    $scope.choice3 = currentExamQuestion.answerChoice[2];
    $scope.choice4 = currentExamQuestion.answerChoice[3];

  }



}
