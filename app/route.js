angular.module('app')
  .config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : 'main.html'
    })
    .when("/logIn", {
      templateUrl : 'logIn.html',
      controller : 'logInCtrl'
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
    .when("/dashboard/:userID", {
      templateUrl : 'dashboard.html',
      controller :'dashboardCtrl'
    })
});
