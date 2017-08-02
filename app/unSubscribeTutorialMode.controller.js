angular.module('app').controller('unSubscribeTutorialModeCtrl', unSubscribeTutorialModeCtrl);

function unSubscribeTutorialModeCtrl($scope, $http, $routeParams, $window, $location) {

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

  $scope.numberOfQuestion = $window.sessionStorage.numberOfQuestion;

  // http get to retrieve Exam question
  $http({
  url: testUrl,
  method: 'GET'
  }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available

    $scope.questionNumber = response.data.questionNumber;
    $scope.question = response.data.question;
    $scope.choice1 = response.data.answerChoice[0];
    $scope.choice2 = response.data.answerChoice[1];
    $scope.choice3 = response.data.answerChoice[2];
    $scope.choice4 = response.data.answerChoice[3];

    // where to clock question starts ?
    $window.sessionStorage.setItem('currentQuestionStartAt', Date.now());

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(response.status);
    $location.path('/errorPage');
  });

  $scope.submitAnswer = function() {

      console.log($scope.formData.answer);

      $scope.submitted = false;
      $scope.next = true;
      $scope.testFinished = false;

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

        /** The logic to check if it is the end of the test here
          * 1. Not to display next question button
          * 2. Instead show end of test and go to Test summary button here
          */
        if ($routeParams.questionNumber === $window.sessionStorage.getItem('numberOfQuestion')) {
          $scope.submitted = false;
          $scope.next = false;
          $scope.testFinished = true;
        }

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response.status);
        $location.path('/errorPage');
      });
    }

    $scope.nextQuestion = function() {
      console.log('Next question, please ...');
      ++$scope.questionNumber;
      console.log($scope.questionNumber);

      // looping through to get the next question in the test
      if ($scope.questionNumber <= $window.sessionStorage.getItem('numberOfQuestion')) {
        // change button type to display
        $scope.submitted = true;
        $scope.next = false;
        $scope.testFinished = false;
        // Fetching a new question from the DB by routing
        var url = '/unSubscribeTest/tutorial/'+$routeParams.testID+'/'+$scope.questionNumber;
        console.log(url);
        $location.path('/unSubscribeTest/tutorial/'+$routeParams.testID+'/'+$scope.questionNumber);
    } else {
      console.log('To show the summary page');
    }
  }

  $scope.showTestSummary = function() {
    $location.path('/testSummaryUnSubscribeUser');
  }
}
