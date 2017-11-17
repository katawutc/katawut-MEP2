angular.module('app')
  .config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : 'main.html',
      controller : 'mainCtrl'
    })
    // for checking the FB login status before routing
    .when("/logInCheck", {
      templateUrl : 'logInCheck.html',
      controller : 'logInCheckCtrl'
    })
    .when("/logIn", {
      templateUrl : 'logIn.html',
      controller : 'logInCtrl'
    })
    .when("/logOut", {
    templateUrl : 'logOut.html',
    controller : 'logOutCtrl',
    resolve: {
      fbLogInStatus : function(fbLogInStatusService) {
        return fbLogInStatusService.getFBLogInStatus();
        }
      }
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
        suAccountData : function(suAccountDataService) {
          return suAccountDataService.getSuAccountData();
        },
        newSuTestID : function (newSuTestIDService){
          return newSuTestIDService.generateNewSuTestID();
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
    /** test writer dashboard */
    .when("/dashboard/tw/:userID", {
      templateUrl : 'dashboard.tw.html',
      controller :'dashboardTwCtrl',
      resolve : {
        dashboardData : function (dashboardTwService){
          return dashboardTwService.getDashboardData();
        }
      }
    })
    /** admin dashboard user list data */
    .when("/dashboard/ad/:userID", {
      templateUrl : 'dashboard.ad.html',
      controller :'dashboardAdCtrl',
      resolve : {
        defaultUser : function(realTimeUserService) {
          return realTimeUserService.getDefaultUser();
        },
        suUser : function(realTimeUserService) {
          return realTimeUserService.getSuUser();
        },
        adUser : function(realTimeUserService) {
          return realTimeUserService.getAdUser();
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
    /** preference setting su*/
    .when('/preferenceSetting/su/:userID', {
      templateUrl : 'preferenceSettingSu.html',
      controller : 'preferenceSettingSuCtrl',
      resolve : {
        preferenceSettingSuData : function(preferenceSettingSuService) {
          return preferenceSettingSuService.getPreferenceSettingSuData();
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
    /** exam list for su */
    .when('/testList/su/:userID', {
      templateUrl : 'suTestList.html',
      controller : 'suTestListCtrl',
      resolve: {
        suDashboardTest : function (suDashboardTestService) {
          return suDashboardTestService.getSuDashboardTest();
        }
      }
    })
    /** article list for su */
    .when('/articleList/su/:userID', {
      templateUrl : 'articleListSu.html',
      controller : 'articleListSuCtrl',
    })
    /** note list for su */
    .when('/noteList/su/:userID', {
      templateUrl : 'suNoteList.html',
      controller : 'suNoteListCtrl',
      resolve: {
        suNoteList : function(suNoteListService) {
          return suNoteListService.getSuNoteList();
        }
      }
    })
    /** view su note */
    .when('/suNote/:userID/:title/:noteTimeStart/:noteTime', {
      templateUrl : 'suNote.html',
      controller : 'suNoteCtrl',
      resolve: {
        suNote : function(suNoteService) {
          return suNoteService.getSuNote();
        }
      }
    })
    /** url callback from facebook */
    .when('/fbLogIn/:fbID', {
      templateUrl : 'fbLogIn.html',
      controller : 'fbLogInCtrl',
      // put resolve and loader waiting for FB loginStatus
    })
    /** user account for admin page*/
    .when('/accountAdmin/:userRole/:userID', {
      templateUrl : 'account.admin.html',
      controller : 'accountAdminCtrl',
      resolve : {
        /** all of these can be in one service but different function */
        accountAdmin : function(accountAdminService) {
          return accountAdminService.getAccountAdmin();
        },
        settingAdmin : function(settingAdminService) {
          return settingAdminService.getSettingAdmin();
        },
        lastLoginAdmin : function(lastLoginAdminService) {
          return lastLoginAdminService.getLastLoginAdmin();
        }
      }
    })
    /** user login history for admin page*/
    .when('/loginHistoryAdmin/:userRole/:userID', {
      templateUrl : 'loginHistory.admin.html',
      controller : 'loginHistoryAdminCtrl',
      resolve : {
        accountAdmin : function(accountAdminService) {
          return accountAdminService.getAccountAdmin();
        },
        loginHistoryAdmin : function(loginHistoryAdminService) {
          return loginHistoryAdminService.getLoginHistoryAdmin();
        }
      }
    })
    /** su new test access */
    .when('/suNewTest/:userID/:testID/:testRunningNumber', {
      templateUrl : 'suNewTest.html',
      controller : 'suNewTestCtrl',
      resolve : {
        suNewTestInfo : function(suNewTestInfoService) {
          return suNewTestInfoService.getSuNewTestInfo();
        },
        suNewTestHeader : function(suNewTestHeaderService) {
          return suNewTestHeaderService.getSuNewTestHeader();
        },
        // to generate new test content
        newSuTest : function(newSuTestService) {
          return newSuTestService.generateNewSuTest();
        }
      }
    })
    /** su test tutorial mode */
    .when('/suTest/tutorialMode/:userID/:suTestID/:suTestQuestionNumber', {
      templateUrl : 'suTestTutorialMode.html',
      controller : 'suTestTutorialModeCtrl',
      resolve : {
        suTestQuestion : function(suTestQuestionService) {
          return suTestQuestionService.getSuTestQuestion();
        },
        registerSuTestHistory: function(suTestHistoryService) {
          return suTestHistoryService.registerSuTestHistory();
        }
      }
    })
    /** su test summary */
    .when('/suTestSummary/:userID/:suTestID/:suTestMode/:suTestStartAt', {
      templateUrl : 'suTestSummary.html',
      controller : 'suTestSummaryCtrl',
      resolve : {
        suTestSummary : function(suTestSummaryService) {
          return suTestSummaryService.getSuTestSummary();
        },
        suTestScore : function(suTestScoreService) {
          return suTestScoreService.getSuTestScore();
        }
      }
    })
    /** su test review */
    .when('/suTestReview/:userID/:suTestID/:suTestQuestionNumber', {
      templateUrl : 'suTestReview.html',
      controller : 'suTestReviewCtrl',
      resolve : {
        suTestReview : function(suTestReviewService) {
          return suTestReviewService.getSuTestReview();
        }
      }
    })
    /** su test exam mode */
    .when('/suTest/examMode/:userID/:suTestID/:suTestQuestionNumber', {
      templateUrl : 'suTestExamMode.html',
      controller : 'suTestExamModeCtrl',
      resolve : {
        suTestQuestion : function(suTestQuestionService) {
          return suTestQuestionService.getSuTestQuestion();
        },
        registerSuTestHistory: function(suTestHistoryService) {
          return suTestHistoryService.registerSuTestHistory();
        }
      }
    })
    /** su test exam mode answer summary */
    .when('/suTestExamModeAnswerSummary/:userID/:suTestID/:suTestStartAt', {
      templateUrl : 'suTestExamModeAnswerSummary.html',
      controller : 'suTestExamModeAnswerSummaryCtrl',
      resolve : {
        suTestExamModeAnswerSummary : function(suTestExamModeAnswerSummaryService) {
          return suTestExamModeAnswerSummaryService.getAnswerSummary();
        }
      }
    })
    /** revise answer sheet su test exam mode */
    .when('/reviseSuTestExamAnswerSheet/:userID/:suTestID/:suTestStartAt/:suTestQuestionNumber', {
      templateUrl : 'reviseSuTestExamAnswerSheet.html',
      controller : 'reviseSuTestExamAnswerSheetCtrl',
      resolve : {
        currentUserAnswer : function(reviseSuTestExamAnswerSheetService) {
          return reviseSuTestExamAnswerSheetService.getCurrentUserAnswer();
        },
        currentExamQuestion : function(reviseSuTestExamAnswerSheetService) {
          return reviseSuTestExamAnswerSheetService.getCurrentExamQuestion();
        }
      }
    })
    /** su test history */
    .when('/suTestHistory/:userID', {
      templateUrl : 'suTestHistory.html',
      controller : 'suTestHistoryCtrl',
      resolve : {
        suTestHistory : function(suTestHistoryService) {
          return suTestHistoryService.getSuTestHistory();
        }
      }
    })
    /** admin chat user list */
    .when('/chatAdmin/:userID', {
      templateUrl : 'chatAdmin.html',
      controller : 'chatAdminCtrl',
      resolve : {
        chatUserList : function(chatAdminService) {
          return chatAdminService.getChatUser();
        }
      }
    })
    /** edit su note */
    .when('/editSuNote/:userID/:title/:noteTimeStart/:noteTime', {
      templateUrl : 'editSuNote.html',
      controller : 'editSuNoteCtrl',
      resolve: {
        suNote : function(suNoteService) {
          return suNoteService.getSuNote();
        }
      }
    })
    /** create su note when at su note lost route */
    .when('/createSuNote/:userID', {
      templateUrl : 'createSuNote.html',
      controller : 'createSuNoteCtrl'
    })
    /** admin user list */
    .when('/admin/userList', {
      templateUrl : 'adminUserList.html',
      controller : 'adminUserListCtrl',
      resolve : {
        userList : function (userListService){
          return userListService.getUserList();
        }
      }
    })
});
