angular.module('app').controller('unSubscribeExamModeCtrl', unSubscribeExamModeCtrl);

function unSubscribeExamModeCtrl($scope, $http, $routeParams, $window, $location, testQuestion) {

  $scope.testID = $routeParams.testID;
  $scope.questionNo = $routeParams.questionNo;

  var currentQuestionNumber = testQuestion.questionNumber;

  // http get to retrieve Exam question
    $scope.questionNo = testQuestion.questionNumber;
    $scope.question = testQuestion.question;
    $scope.choice1 = testQuestion.answerChoice[0];
    $scope.choice2 = testQuestion.answerChoice[1];
    $scope.choice3 = testQuestion.answerChoice[2];
    $scope.choice4 = testQuestion.answerChoice[3];

    // where to clock question starts ?
    $window.sessionStorage.setItem('currentQuestionStartAt', Date.now());
    console.log('currentQuestionStartAt: '+$window.sessionStorage.currentQuestionStartAt);

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

        console.log(response.data);

        if (currentQuestionNumber < $window.sessionStorage.getItem('numberOfQuestion')) {
          ++currentQuestionNumber;

          console.log('/unSubscribeTest/exam/'+$routeParams.testID+'/'+currentQuestionNumber);

          $location.path('/unSubscribeTest/exam/'+$routeParams.testID+'/'+currentQuestionNumber);
        }
        else {
          console.log(currentQuestionNumber);
          $location.path('/answerSummary');

        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response.status);
        $location.path('/errorPage');
      });
    }

    //markQuestion()
    $scope.markQuestion = function() {

      /**
       * modal dialog to show user that the question is skipped
       */
      console.log('mark this question');

      /** mark the question as unAnswered
       * $scope.formData.answer = 'unAnswered';
       */

       var answerJSON = {userName: $window.sessionStorage.userName,
                         userID: $window.sessionStorage.userID,
                         testID: $routeParams.testID,
                         testMode: $window.sessionStorage.testMode,
                         testStartAt: $window.sessionStorage.testStartAt,
                         questionNumber: $routeParams.questionNumber,
                         status: 'marked',
                         answer: $scope.formData.answer,
                         currentQuestionStartAt: $window.sessionStorage.currentQuestionStartAt,
                         currentQuestionFinishAt: $window.sessionStorage.currentQuestionFinishAt};

        var examAnswerSummaryUrl = '/examAnswerSummary';

        $http({
        url: examAnswerSummaryUrl,
        method: 'POST',
        data: answerJSON
        }).then(function successCallback(response) {

        console.log(response.data);

        if (currentQuestionNumber < $window.sessionStorage.getItem('numberOfQuestion')) {
          ++currentQuestionNumber;

          console.log('/unSubscribeTest/exam/'+$routeParams.testID+'/'+currentQuestionNumber);

          $location.path('/unSubscribeTest/exam/'+$routeParams.testID+'/'+currentQuestionNumber);
          }
        else {
          console.log(currentQuestionNumber);
          $location.path('/answerSummary');
        }
      }, function errorCallback(response) {
        console.log(response.status);
        $location.path('/errorPage');
    });
  }

    $scope.stopTheTest = function() {
      /**
       * Modal dialog to show user the test will be stopped
       * and reset
       */
      console.log('Stop the test');
      $location.path('/unSubscribeTestContent');
    }

}
