angular.module('app').controller('reviseExamAnswerSheetCtrl',
                                  reviseExamAnswerSheetCtrl);

function reviseExamAnswerSheetCtrl($scope, $http, $routeParams, $window,
                                    $location, currentUserAnswerExam) {

  console.log(currentUserAnswerExam);

  //$scope.formData = currentUserAnswerExam;


  // get the question first
  var getQuestionUrl = 'unSubscribeTest/'+$routeParams.testMode+'/'
                        +$routeParams.testID+'/'
                        +$routeParams.questionNumber;

  console.log(getQuestionUrl);

  // get the user answer to populate the question
}
