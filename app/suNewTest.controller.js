angular.module('app').controller('suNewTestCtrl', ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'suNewTestInfo', 'suNewTestHeader',
                                      suNewTestCtrl]);

function suNewTestCtrl($scope, $http, $routeParams,
                          $window, $location, suNewTestInfo, suNewTestHeader) {

    // to separate testID and test running number

    $scope.testID = suNewTestInfo.testID;
    $scope.testDescription = suNewTestHeader.testDescription;

    $scope.startTestTutorialMode = function() {

      $window.sessionStorage.testID = $scope.testID;

      console.log('startTestTutorialMode');

      var suTestTutorialUrl = '/suTest/tutorialMode/'+$window.sessionStorage.userID+'/'+
                                $scope.testID+'/'+1;

      console.log(suTestTutorialUrl);

      $location.path(suTestTutorialUrl);
  }
}
