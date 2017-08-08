angular.module('app').controller('unSubscribeTutorialModeCtrl', unSubscribeTutorialModeCtrl);

function unSubscribeTutorialModeCtrl($scope, $http, $routeParams, $window, $location, testQuestion) {

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

  var testUrl = '/unSubscribeTest/tutorial/'+$routeParams.testID+'/'+$routeParams.questionNumber;

  var currentQuestionNumber = testQuestion.questionNumber;

  $scope.numberOfQuestion = $window.sessionStorage.numberOfQuestion;

  $scope.questionNumber = testQuestion.questionNumber;
  $scope.question = testQuestion.question;
  $scope.choice1 = testQuestion.answerChoice[0];
  $scope.choice2 = testQuestion.answerChoice[1];
  $scope.choice3 = testQuestion.answerChoice[2];
  $scope.choice4 = testQuestion.answerChoice[3];

  // where to clock question starts ?
  $window.sessionStorage.setItem('currentQuestionStartAt', Date.now());

  $scope.submitAnswer = function() {

      // defect when question reach the end of test; still show next button

      // where to clock question finishes ?
      $window.sessionStorage.setItem('currentQuestionFinishAt', Date.now());

      var answerJSON = {userName: 'unSubscribe',
                        userID: $window.sessionStorage.userID,
                        testID: $window.sessionStorage.testID,
                        testMode: $window.sessionStorage.testMode,
                        testStartAt: $window.sessionStorage.testStartAt,
                        questionNumber: $routeParams.questionNumber,
                        answer: $scope.formData.answer,
                        currentQuestionStartAt: $window.sessionStorage.currentQuestionStartAt,
                        currentQuestionFinishAt: $window.sessionStorage.currentQuestionFinishAt};

      // use service to check the answer on the server
      // http get to retrieve Exam question

      var urlCheckAnswer = '/unSubscribeTest/checkAnswer/'+$window.sessionStorage.testMode;

      $http({
      url: urlCheckAnswer,
      method: 'POST',
      data: answerJSON
      }).then(function successCallback(response) {

        $scope.result = response.data.result;
        $scope.explanation = response.data.explanation

        if ($routeParams.questionNumber === $window.sessionStorage.getItem('numberOfQuestion')) {
          $scope.submitted = false;
          $scope.next = false;
          $scope.testFinished = true;
        }
        else {
        $scope.submitted = false;
        $scope.next = true;
        $scope.testFinished = false;
      }

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response.status);
        $location.path('/errorPage');
      });
    }

    $scope.nextQuestion = function() {

      ++currentQuestionNumber;

        if (currentQuestionNumber <= $window.sessionStorage.getItem('numberOfQuestion')) {
        // change button type to display
        $scope.submitted = true;
        $scope.next = false;
        $scope.testFinished = false;
        // Fetching a new question from the DB by routing
        var url = '/unSubscribeTest/tutorial/'+$routeParams.testID+'/'+currentQuestionNumber;
        console.log(url);
        $location.path('/unSubscribeTest/tutorial/'+$routeParams.testID+'/'+currentQuestionNumber);
    } else {
      console.log('To show the summary page');
    }
  }

  $scope.showTestSummary = function() {
    $location.path('/testSummaryUnSubscribeUser');
  }
}
