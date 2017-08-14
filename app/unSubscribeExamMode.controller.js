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

      /**
       *  1. check if the question is unanswered e.g. $scope.formData.answer === null
       */
      //----

      // clock question finishes
      $window.sessionStorage.setItem('currentQuestionFinishAt', Date.now());

      var answerJSON = {userName: 'unSubscribe',
                        userID: $window.sessionStorage.userID,
                        testID: $routeParams.testID,
                        testMode: $window.sessionStorage.testMode,
                        testStartAt: $window.sessionStorage.testStartAt,
                        questionNumber: $routeParams.questionNumber,
                        answer: $scope.formData.answer,
                        currentQuestionStartAt: $window.sessionStorage.currentQuestionStartAt,
                        currentQuestionFinishAt: $window.sessionStorage.currentQuestionFinishAt};

      // use service to check the answer on the server
      // http get to retrieve Exam question
      var urlCheckAnswer = '/unSubscribeTest/checkAnswer/'+$window.sessionStorage.testMode

      $http({
      url: urlCheckAnswer,
      method: 'POST',
      data: answerJSON /*,
      headers: {
        'Authorization': 'JWT ' + $window.sessionStorage.token
      } */
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('Checked answer is returned.')

        /** The logic to check if it is the end of the test here
          * 1. Not to display next question button
          * 2. Instead show end of test and go to Test summary button here
          */

        if (currentQuestionNumber !== $window.sessionStorage.getItem('numberOfQuestion')) {
          ++currentQuestionNumber;

          console.log('/unSubscribeTest/exam/'+$routeParams.testID+'/'+currentQuestionNumber);

          $location.path('/unSubscribeTest/exam/'+$routeParams.testID+'/'+currentQuestionNumber);
        }
        else {

          /**
           * To check if there are unAnswered question before go to test summary page
           */

          $location.path('/testSummaryUnSubscribeUser');
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response.status);
        $location.path('/errorPage');
      });
    }

    $scope.skipQuestion = function() {

      /**
       * modal dialog to show user that the question is skipped
       */
      console.log('Skip this question');

      /** mark the question as unAnswered
       * $scope.formData.answer = 'unAnswered';
       */

       var answerJSON = {userName: 'unSubscribe',
                         userID: $window.sessionStorage.userID,
                         testID: $routeParams.testID,
                         testMode: $window.sessionStorage.testMode,
                         testStartAt: $window.sessionStorage.testStartAt,
                         questionNumber: $routeParams.questionNo,
                         answer: 'unAnswered',
                         currentQuestionStartAt: $window.sessionStorage.currentQuestionStartAt,
                         currentQuestionFinishAt: 'unAnswered'};

       var urlUnAnswered = '/questionStatusUnAnswered';

       $http({
       url: urlUnAnswered,
       method: 'POST',
       data: answerJSON /*,
       headers: {
         'Authorization': 'JWT ' + $window.sessionStorage.token
       } */
       }).then(function successCallback(response) {
         // this callback will be called asynchronously
         // when the response is available
         console.log('Remark unAnswered question is returned.')

         /** The logic to check if it is the end of the test here
           * 1. Not to display next question button
           * 2. Instead show end of test and go to Test summary button here
           */
         if ($routeParams.questionNo !== $window.sessionStorage.getItem('numberOfQuestion')) {
           ++$routeParams.questionNo;

           console.log('/unSubscribeTest/exam/'+$routeParams.testID+'/'+$routeParams.questionNo);

           $location.path('/unSubscribeTest/exam/'+$routeParams.testID+'/'+$routeParams.questionNo);
         }
         else {
           /**
            * To check if there are some unAnswered question
            */

            var urlGetQuestionStatusUnAnswered = '/getQuestionStatusUnAnswered/'
                                                  +$window.sessionStorage.userID+'/'
                                                  +$window.sessionStorage.testID+'/'
                                                  +$window.sessionStorage.testMode+'/'
                                                  +$window.sessionStorage.testStartAt

            $http({
            url: urlGetQuestionStatusUnAnswered,
            method: 'GET',
            /*,
            headers: {
              'Authorization': 'JWT ' + $window.sessionStorage.token
            } */
            }).then(function successCallback(response) {
              if(response.data !== 0) {
                console.log('there are some unAnswered question');
                console.log(response.data);

                // call function to display unAnswered question
                $location.path('/unAnsweredQuestion');
              }

            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.

            });

         }
       }, function errorCallback(response) {
         // called asynchronously if an error occurs
         // or server returns response with an error status.
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
