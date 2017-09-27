angular.module('app').controller('suNewTestCtrl', ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'suNewTestInfo', 'suNewTestHeader',
                                      suNewTestCtrl]);

function suNewTestCtrl($scope, $http, $routeParams,
                          $window, $location, suNewTestInfo, suNewTestHeader) {

  $scope.testID = suNewTestInfo.testID;
  $scope.testDescription = suNewTestHeader.testDescription;

  $scope.startTestTutorialMode = function(){
    console.log('startTestTutorialMode');
  }

}
