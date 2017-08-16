angular.module('app').controller('reviseExamAnswerSheetCtrl',
                                  reviseExamAnswerSheetCtrl);

function reviseExamAnswerSheetCtrl($scope, $http, $routeParams, $window,
                                    $location, currentUserAnswerExam,
                                    reviseExamQuestion) {

  console.log(currentUserAnswerExam);

  console.log(reviseExamQuestion);

  $scope.currentUserAnswer = currentUserAnswerExam;

  $scope.questionNumber = reviseExamQuestion.questionNumber;
  $scope.question = reviseExamQuestion.question;
  $scope.choice1 = reviseExamQuestion.answerChoice[0];
  $scope.choice2 = reviseExamQuestion.answerChoice[1];
  $scope.choice3 = reviseExamQuestion.answerChoice[2];
  $scope.choice4 = reviseExamQuestion.answerChoice[3];

  //$scope.formData.answer = currentUserAnswerExam;

}

  //$scope.formData = currentUserAnswerExam;


  // get the question first
  /*
  var getQuestionUrl = 'unSubscribeTest/'+$routeParams.testMode+'/'
                        +$routeParams.testID+'/'
                        +$routeParams.questionNumber;

  console.log(getQuestionUrl);
  */

  // get the user answer to populate the question
