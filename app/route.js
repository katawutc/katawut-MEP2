angular.module('app')
  .config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : 'main.html',
      controller : 'mainCtrl'
    })
    .when("/logIn", {
      templateUrl : 'logIn.html',
      controller : 'logInCtrl'
    })
    .when("/logOut", {
    templateUrl : 'logOut.html',
    controller : 'logOutCtrl'
    })
    .when("/signUp", {
      templateUrl : 'signUp.html',
      controller : 'signUpCtrl'
    })
    .when("/unSubscribeTestContent", {
      templateUrl : 'unSubscribeTestContent.html'
    })
    .when("/unSubscribeTestMain/:testID", {
      templateUrl : 'unSubscribeTestMain.html',
      controller : 'unSubscribeTestMainCtrl',
      resolve : {
        testHeader : function(testHeaderService) {
          return testHeaderService.getTestHeader();
        }
      }
    })
    .when("/unSubscribeTest/tutorial/:testID/:questionNumber", {
      templateUrl : 'unSubscribeTutorialMode.html',
      controller : 'unSubscribeTutorialModeCtrl',
      resolve : {
        testQuestion : function(testQuestionService) {
          return testQuestionService.getTestQuestion();
        }
      }
    })
    .when("/unSubscribeTest/exam/:testID/:questionNumber", {
      templateUrl : 'unSubscribeExamMode.html',
      controller : 'unSubscribeExamModeCtrl',
      resolve : {
        testQuestion : function(testQuestionService) {
          return testQuestionService.getTestQuestion();
        }
      }
    })
    .when("/testSummaryUnSubscribeUser", {
      templateUrl : 'testSummaryUnSubscribeUser.html',
      controller : 'testSummaryUnSubscribeUserCtrl',
      resolve : {
        testScore : function(testScoreService) {
          return testScoreService.getTestScore();
        },
        testSummary : function(testSummaryService) {
          return testSummaryService.getTestSummary();
        }
      }
    })
    .when("/reviewUnSubscribeTest/:testID/:questionNumber", {
      templateUrl : 'reviewUnSubscribeTest.html',
      controller : 'reviewUnSubscribeTestCtrl',
      resolve : {
        reviewUnSubscribeTest : function (reviewUnSubscribeTestService) {
          return reviewUnSubscribeTestService.getReviewQuestion();
        }
      }
    })
    .when("/dashboard/:userRole/:userID", {
      templateUrl : 'dashboard.html',
      controller :'dashboardCtrl',
      resolve : {
        dashboardData : function (dashboardService){
          return dashboardService.getDashboardData();
        }
      }
    })
    .when('/answerSummary', {
      templateUrl : 'answerSummary.html',
      controller : 'answerSummaryCtrl',
      resolve : {
        answerSummary : function (answerSummaryService) {
          return answerSummaryService.getAnswerSummary();
        }
      }
    })
    /** revise answer sheet routing */
    .when('/reviseExamAnswerSheet/:userID/:testMode/:testStartAt/:testID/:questionNumber', {
      templateUrl : 'reviseExamAnswerSheet.html',
      controller : 'reviseExamAnswerSheetCtrl',
      resolve : {
        currentUserAnswerExam : function(reviseExamAnswerSheetService) {
          return reviseExamAnswerSheetService.getCurrentUserAnswer();
        },
        reviseExamQuestion : function(reviseExamAnswerSheetService) {
          return reviseExamAnswerSheetService.getReviseExamQuestion();
        }
      }
    })
    /** submit anser sheet exam mode for score and review solution */
    .when('/testSummaryExamMode', {
      templateUrl : 'testSummaryExamMode.html',
      controller : 'testSummaryExamModeCtrl',
      resolve :
      {
        examScore : function(examScoreService) {
          return examScoreService.getExamScore();
        },
        examSummary : function(examSummaryService) {
          return examSummaryService.getExamSummary();
        }
      }
    })
    /** review test solution */
    .when('/reviewTestSolution/:testID/:questionNumber', {
      templateUrl : 'reviewTestSolution.html',
      controller : 'reviewTestSolutionCtrl',
      resolve : {
        reviewTestSolution : function(reviewTestSolutionService) {
          return reviewTestSolutionService.getTestSolution();
        }
      }
    })
});
