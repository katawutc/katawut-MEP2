angular.module('app')
  .config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : 'main.html'
    })
});
