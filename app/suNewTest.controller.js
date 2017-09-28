angular.module('app').controller('suNewTestCtrl', ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'suNewTestInfo', 'suNewTestHeader',
                                      suNewTestCtrl]);

function suNewTestCtrl($scope, $http, $routeParams,
                          $window, $location, suNewTestInfo, suNewTestHeader) {

    // to separate testID and test running number

    $scope.suTestID = suNewTestInfo.suTestID;
    $scope.testDescription = suNewTestHeader.testDescription;

    console.log($scope.suTestID);

    $scope.startTestTutorialMode = function() {

      // use suTestID
      $window.sessionStorage.suTestID = $scope.suTestID;

      console.log('startTestTutorialMode');

      var suTestTutorialUrl = '/suTest/tutorialMode/'+$window.sessionStorage.userID+'/'+
                                $scope.suTestID+'/'+1;

      console.log(suTestTutorialUrl);

      $location.path(suTestTutorialUrl);
  }
}
