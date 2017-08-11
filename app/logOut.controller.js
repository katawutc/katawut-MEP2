
angular.module('app').controller('logOutCtrl', logOutCtrl);

function logOutCtrl($scope, $http, $routeParams, $window, $location) {

    // To implement asynchronous function before pass message to view
    $window.sessionStorage.clear();

    $scope.message = 'You have successfully logged out.';

  }
