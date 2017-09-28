angular.module('app').controller('suTestTutorialModeCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                      'suTestQuestion',
                                      suTestTutorialModeCtrl]);

function suTestTutorialModeCtrl($scope, $http, $routeParams,
                          $window, $location, suTestQuestion) {

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
    console.log('receive su test question');
    console.log(suTestQuestion);

    $scope.testID = suTestQuestion.testID; // testID not suTestID
    $scope.questionNumber = suTestQuestion.questionNumber; // testID questionNumber
    $scope.question = suTestQuestion.question;
    $scope.choice1 = suTestQuestion.answerChoice[0];
    $scope.choice2 = suTestQuestion.answerChoice[1];
    $scope.choice3 = suTestQuestion.answerChoice[2];
    $scope.choice4 = suTestQuestion.answerChoice[3];

  }

  // handle submit answer
  $scope.submitAnswer = function() {

      console.log('submitAnswer');

      var answerJSON = {userID: $window.sessionStorage.userID,
                        testID: $scope.testID, // main testID
                        questionNumber: $scope.questionNumber,
                        answer: $scope.formData.answer};

      console.log(answerJSON);

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

        $scope.submitted = false;
        $scope.next = true;
        $scope.testFinished = false;
      })
      ,function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(response.status);
        $location.path('/errorPage');
      };
    }


    $scope.nextQuestion = function() {

      console.log('next question to display');
    }
}
