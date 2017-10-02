angular.module('app').controller('suTestExamModeCtrl',
                                  ['$scope', '$http', '$route',
                                    '$window', '$location', 'suTestQuestion',
                                      suTestExamModeCtrl]);

function suTestExamModeCtrl($scope, $http, $route,
                          $window, $location, suTestQuestion) {

  // for displaying on 2nd nav bar
  $scope.suTestID = $window.sessionStorage.suTestID;

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
  var suTestCurrentQuestionNumber = $scope.suTestQuestionNumber;

  $scope.submitAnswerExamMode = function() {

    console.log('submitAnswerExamMode');

    var answerJSON = {userID: $window.sessionStorage.userID,
                      suTestID: $window.sessionStorage.suTestID,
                      suTestMode: $window.sessionStorage.suTestMode,
                      suTestStartAt: $window.sessionStorage.suTestStartAt,
                      suTestQuestionNumber: suTestCurrentQuestionNumber,
                      suTestQuestionStatus: 'answered',
                      suTestAnswer: $scope.formData.answer,
                      testID: $scope.testID,
                      questionNumber: $scope.questionNumber};

    var submitAnswerSuTestExamMode = '/submitAnswerSuTestExamMode/'+$window.sessionStorage.userID+'/'+
                                        $window.sessionStorage.suTestID+'/'+
                                        suTestCurrentQuestionNumber;

    console.log(submitAnswerSuTestExamMode);

    $http({
    url: submitAnswerSuTestExamMode,
    method: 'POST',
    data: answerJSON,
    headers: {
      'Authorization': 'JWT ' + $window.sessionStorage.token
      }
    }).then(function successCallback(response) {

      console.log(response.data);

      // to check the response.data if good to continue

      if (suTestCurrentQuestionNumber < $window.sessionStorage.suTestSize) {

        ++suTestCurrentQuestionNumber;

        var nextSutestQuestionUrl = '/suTest/examMode/'+$window.sessionStorage.userID+'/'+
                                      $window.sessionStorage.suTestID+'/'+
                                      suTestCurrentQuestionNumber;

        $location.path(nextSutestQuestionUrl);
      }
      else {

        console.log(suTestCurrentQuestionNumber);

        var suTestExamModeAnswerSummaryUrl = '/suTestExamModeAnswerSummary/'+$window.sessionStorage.userID+'/'+
                                                $window.sessionStorage.suTestID+'/'+
                                                $window.sessionStorage.suTestStartAt;
                                                
        $location.path(suTestExamModeAnswerSummaryUrl);

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
  }

  $scope.answerSheetSummary = function() {
    //console.log('go to answerSheetSummary');
    //$location.path('/answerSummary');
  }

  $scope.stopTheTest = function() {

  }
}
