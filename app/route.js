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
      controller : 'unSubscribeTestMainCtrl'
    })
    .when("/unSubscribeTest/tutorial/:testID/:questionNumber", {
      templateUrl : 'unSubscribeTutorialMode.html',
      controller : 'unSubscribeTutorialModeCtrl'
    })
});
