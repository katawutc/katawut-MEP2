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
    .when("/signUpInstruction", {
      templateUrl : 'signUpInstruction.html',
      controller : 'signUpInstructionCtrl'
    })
    .when("/signUpActivate/:userID/:hashActivate", {
      templateUrl : 'signUpActivate.html',
      controller : 'signUpActivateCtrl'
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
    .when("/dashboard/su/:userID", {
      templateUrl : 'dashboard.su.html',
      controller :'dashboardSuCtrl',
      resolve : {
        dashboardData : function (dashboardSuService){
          return dashboardSuService.getDashboardData();
        }
      }
    })
    .when("/dashboard/pu/:userID", {
      templateUrl : 'dashboard.pu.html',
      controller :'dashboardPuCtrl',
      resolve : {
        dashboardData : function (dashboardPuService){
          return dashboardPuService.getDashboardData();
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
    /** error page route */
    .when('/errorPage', {
      templateUrl : 'errorPage.html',
      controller : 'errorPageCtrl'
    })
    /** profile setting su*/
    .when('/profileSetting/su/:userID', {
      templateUrl : 'profileSettingSu.html',
      controller : 'profileSettingSuCtrl',
      resolve : {
        profileSettingSuData : function(profileSettingSuService) {
          return profileSettingSuService.getProfileSettingSuData();
        }
      }
    })
    /** 1st time setting for su */
    .when('/firstSetting/su/:userID', {
      templateUrl : 'firstSettingSu.html',
      controller : 'firstSettingSuCtrl',
    })
    /** account setting for su */
    .when('/accountSetting/su/:userID', {
      templateUrl : 'accountSettingSu.html',
      controller : 'accountSettingSuCtrl',
    })
    /** preference setting for su */
    .when('/preferenceSetting/su/:userID', {
      templateUrl : 'preferenceSettingSu.html',
      controller : 'preferenceSettingSuCtrl',
    })
});
