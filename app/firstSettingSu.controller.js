angular.module('app').controller('firstSettingSuCtrl',
                                  firstSettingSuCtrl);

function firstSettingSuCtrl ($scope, $http, $routeParams, $window,
                            $location) {

  // use DB to fetch this in the future
  $scope.levelList = ['P6', 'M3', 'M6', 'others 1'];

  $scope.testList = ['O-net', 'others 1', 'others 2', 'others 3'];

  $scope.subjectList = ['Math', 'English', 'Science', 'others 1'];

  $scope.saveSetting = function(){
    // save the first setting parameter into the DB

    // route to the dashboard
  }

}
