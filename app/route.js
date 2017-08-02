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
});
