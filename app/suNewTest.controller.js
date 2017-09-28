angular.module('app').controller('suNewTestCtrl', ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'suNewTestInfo', 'suNewTestHeader',
                                      suNewTestCtrl]);

function suNewTestCtrl($scope, $http, $routeParams,
                          $window, $location, suNewTestInfo, suNewTestHeader) {

    // to separate testID and test running number

    $scope.suTestID = suNewTestInfo.suTestID;
    $scope.testDescription = suNewTestHeader.testDescription;

    $scope.startTestTutorialMode = function() {

      // use suTestID
      $window.sessionStorage.suTestID = $scope.suTestID;
      $window.sessionStorage.suTestSize = suNewTestInfo.suTestSize;

      var suTestTutorialUrl = '/suTest/tutorialMode/'+$window.sessionStorage.userID+'/'+
                                  $scope.suTestID+'/'+1;

      $location.path(suTestTutorialUrl);
  }
}
