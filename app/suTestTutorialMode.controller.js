angular.module('app')
.controller('suTestTutorialModeCtrl',
           ['$scope', '$http', '$route',
            '$window', '$location',
            'suTestQuestion', 'registerSuTestHistory',
             suTestTutorialModeCtrl]);

function suTestTutorialModeCtrl($scope, $http, $route,
                                $window, $location, suTestQuestion, registerSuTestHistory) {

  console.log(registerSuTestHistory);

  if (registerSuTestHistory !== 'registered') {
    console.log('cannot registerSuTestHistory');

    /**
     * 1. if error put in $window.sessionStorage
     * 2. direct to error page
     */
  }

  // for displaying on 2nd nav bar
  $scope.suTestID = $window.sessionStorage.suTestID;

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

  /** handle suTestQuestion*/
  if (suTestQuestion) {

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

  // handle submit answer
  $scope.submitAnswer = function() {

      var answerJSON = {userID: $window.sessionStorage.userID,
                        testID: $scope.testID, // main testID
                        suTestNumber: $window.sessionStorage.suTestNumber,
                        suTestID: $window.sessionStorage.suTestID,
                        suTestMode: $window.sessionStorage.suTestMode,
                        suTestStartAt : $window.sessionStorage.suTestStartAt,
                        suTestQuestionNumber: $route.current.params.suTestQuestionNumber,
                        questionNumber: $scope.questionNumber,
                        answer: $scope.formData.answer};

      var suTestCheckAnswerUrl = '/suTest/checkAnswer/'+$window.sessionStorage.userID;

      $http({
      url: suTestCheckAnswerUrl,
      method: 'POST',
      data: answerJSON,
      headers: {
        'Authorization': 'JWT ' + $window.sessionStorage.token
        }
      }).then(function successCallback(response) {

        $scope.result = response.data.result;
        $scope.explanation = response.data.explanation;

        // to implement condition to stop and end of the test and next question
        if ($route.current.params.suTestQuestionNumber ===
            $window.sessionStorage.suTestSize) {

          $scope.submitted = false;
          $scope.next = false;
          $scope.testFinished = true;
        }
        else {
          $scope.submitted = false;
          $scope.next = true;
          $scope.testFinished = false;
      }

      })
      ,function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response.status);
        $location.path('/errorPage');
      };
    }

    $scope.nextQuestion = function() {

      ++suTestCurrentQuestionNumber;

      if (suTestCurrentQuestionNumber <= $window.sessionStorage.suTestSize) {
        // change button type to display
        $scope.submitted = true;
        $scope.next = false;
        $scope.testFinished = false;
        // Fetching a new question from the DB by routing
        var suTestNextQuestionUrl =
          '/suTest/tutorialMode/'+$window.sessionStorage.userID+'/'+
            $window.sessionStorage.suTestID+'/'+suTestCurrentQuestionNumber;

        $location.path(suTestNextQuestionUrl);

      } else {

      }
    }

    $scope.suTestSummary = function() {

      var suTestSummaryUrl = '/suTestSummary/'+$window.sessionStorage.userID+'/'+
                              $window.sessionStorage.suTestID+'/'+
                              $window.sessionStorage.suTestMode+'/'+
                              $window.sessionStorage.suTestStartAt;

      $location.path(suTestSummaryUrl);
    }
}
