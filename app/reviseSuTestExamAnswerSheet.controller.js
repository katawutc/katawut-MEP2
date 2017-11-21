angular.module('app')
.controller('reviseSuTestExamAnswerSheetCtrl',
           ['$scope', '$http', '$route',
            '$window', '$location',
            'currentUserAnswer', 'currentExamQuestion',
             reviseSuTestExamAnswerSheetCtrl]);

function reviseSuTestExamAnswerSheetCtrl($scope, $http, $route,
                                          $window, $location,
                                          currentUserAnswer, currentExamQuestion) {

  $scope.suTestID = $window.sessionStorage.suTestID;

  $scope.currentUserAnswer = currentUserAnswer;

  /** handle currentExamQuestion */
  if (currentExamQuestion) {

    $scope.testID = currentExamQuestion.testID;
    $scope.questionNumber = currentExamQuestion.questionNumber;
    $scope.suTestQuestionNumber = $route.current.params.suTestQuestionNumber;
    $scope.suTestSize = $window.sessionStorage.suTestSize;
    $scope.question = currentExamQuestion.question;
    $scope.choice1 = currentExamQuestion.answerChoice[0];
    $scope.choice2 = currentExamQuestion.answerChoice[1];
    $scope.choice3 = currentExamQuestion.answerChoice[2];
    $scope.choice4 = currentExamQuestion.answerChoice[3];

  }

  var suTestCurrentQuestionNumber = $route.current.params.suTestQuestionNumber;

  $scope.submitAnswerExamMode = function() {

    var answerJSON = {'userID': $window.sessionStorage.userID,
                      'suTestID': $window.sessionStorage.suTestID,
                      'suTestMode': $window.sessionStorage.suTestMode,
                      'suTestStartAt': $window.sessionStorage.suTestStartAt,
                      'suTestQuestionNumber': suTestCurrentQuestionNumber,
                      'suTestQuestionStatus': 'answered',
                      'suTestAnswer': $scope.formData.answer,
                      'testID': $scope.testID,
                      'questionNumber': $scope.questionNumber};

    var submitAnswerSuTestExamMode = '/submitAnswerSuTestExamMode/'+$window.sessionStorage.userID+'/'+
                                       $window.sessionStorage.suTestID+'/'+
                                       suTestCurrentQuestionNumber;

    $http({
    url: submitAnswerSuTestExamMode,
    method: 'POST',
    data: answerJSON,
    headers: {
      'Authorization': 'JWT ' + $window.sessionStorage.token
      }
    }).then(function successCallback(response) {

      // to check the response.data if good to continue

      if (suTestCurrentQuestionNumber < $window.sessionStorage.suTestSize) {

        ++suTestCurrentQuestionNumber;

        var nextReviseSutestQuestionUrl = '/reviseSuTestExamAnswerSheet/'+$window.sessionStorage.userID+'/'+
                                            $window.sessionStorage.suTestID+'/'+
                                            $window.sessionStorage.suTestStartAt+'/'+
                                            suTestCurrentQuestionNumber;

        $location.path(nextReviseSutestQuestionUrl);
      }
      else {

        var suTestExamModeAnswerSummaryUrl = '/suTestExamModeAnswerSummary/'+$window.sessionStorage.userID+'/'+
                                               $window.sessionStorage.suTestID+'/'+
                                               $window.sessionStorage.suTestStartAt;

        $location.path(suTestExamModeAnswerSummaryUrl);

      }
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      $location.path('/errorPage');
    });
  }

    //markQuestion()
    $scope.markQuestion = function() {
      // to update suTestQuestionStatus as mark
    }

    $scope.answerSheetSummary = function() {

      var suTestExamModeAnswerSummaryUrl = '/suTestExamModeAnswerSummary/'+$window.sessionStorage.userID+'/'+
                                             $window.sessionStorage.suTestID+'/'+
                                             $window.sessionStorage.suTestStartAt;

      $location.path(suTestExamModeAnswerSummaryUrl);
    }

  }
