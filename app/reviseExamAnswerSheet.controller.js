angular.module('app').controller('reviseExamAnswerSheetCtrl',
                                  reviseExamAnswerSheetCtrl);

function reviseExamAnswerSheetCtrl($scope, $http, $routeParams, $window,
                                    $location, currentUserAnswerExam,
                                    reviseExamQuestion) {

  $scope.currentUserAnswer = currentUserAnswerExam;

  $scope.questionNumber = reviseExamQuestion.questionNumber;
  $scope.question = reviseExamQuestion.question;
  $scope.choice1 = reviseExamQuestion.answerChoice[0];
  $scope.choice2 = reviseExamQuestion.answerChoice[1];
  $scope.choice3 = reviseExamQuestion.answerChoice[2];
  $scope.choice4 = reviseExamQuestion.answerChoice[3];

  /**
   * To implement re-submit the answer to update the DB
   */


  /**
   * To implement the answer sheet function
   */


   /**
    * what to do with marked function ?
    */

}
