angular.module('app')
.controller('reviseExamAnswerSheetCtrl',
           ['$scope', '$http', '$routeParams', '$window',
            '$location', 'currentUserAnswerExam',
            'reviseExamQuestion',
             reviseExamAnswerSheetCtrl]);

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

   var currentQuestionNumber = $routeParams.questionNumber;

   $scope.submitAnswerExamMode = function() {

       // clock question finishes
       $window.sessionStorage.setItem('currentQuestionFinishAt', Date.now());

       var answerJSON = {userName: $window.sessionStorage.userName,
                         userID: $window.sessionStorage.userID,
                         testID: $routeParams.testID,
                         testMode: $window.sessionStorage.testMode,
                         testStartAt: $window.sessionStorage.testStartAt,
                         questionNumber: $routeParams.questionNumber,
                         status: 'answered',
                         answer: $scope.formData.answer,
                         currentQuestionStartAt: $window.sessionStorage.currentQuestionStartAt,
                         currentQuestionFinishAt: $window.sessionStorage.currentQuestionFinishAt};

       var examAnswerSummaryUrl = '/examAnswerSummary';

       $http({
       url: examAnswerSummaryUrl,
       method: 'POST',
       data: answerJSON
       }).then(function successCallback(response) {

         if (currentQuestionNumber < $window.sessionStorage.getItem('numberOfQuestion')) {
           ++currentQuestionNumber;

           var reviseAnswerUrl = '/reviseExamAnswerSheet/'+
                                  $window.sessionStorage.userID+'/'+
                                  $window.sessionStorage.testMode+'/'+
                                  $window.sessionStorage.testStartAt+'/'+
                                  $window.sessionStorage.testID+'/'+
                                  currentQuestionNumber;

           $location.path(reviseAnswerUrl);
         }
         else {

           $location.path('/answerSummary');

         }
       }, function errorCallback(response) {
         // called asynchronously if an error occurs
         // or server returns response with an error status.

         $location.path('/errorPage');
       });
     }

   /** */


  /**
   * To implement the answer sheet function
   */
   $scope.answerSheetSummary = function() {

     $location.path('/answerSummary');
   }

}
