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
      $window.sessionStorage.suTestMode = 'tutorial';
      $window.sessionStorage.suTestSize = suNewTestInfo.suTestSize;
      $window.sessionStorage.suTestStartAt =  Date.now();

      /** post to the server to registory the suTestHistory */

      var suTestTutorialUrl = '/suTest/tutorialMode/'+$window.sessionStorage.userID+'/'+
                                  $scope.suTestID+'/'+1;

      $location.path(suTestTutorialUrl);
  }

    $scope.startTestExamMode = function() {

      console.log('start su test Exam mode');

      // use suTestID
      $window.sessionStorage.suTestID = $scope.suTestID;
      $window.sessionStorage.suTestMode = 'exam';
      $window.sessionStorage.suTestSize = suNewTestInfo.suTestSize;
      $window.sessionStorage.suTestStartAt =  Date.now();

      /** post to the server to registory the suTestHistory */

      var suTestExamUrl = '/suTest/examMode/'+$window.sessionStorage.userID+'/'+
                                  $scope.suTestID+'/'+1;

      $location.path(suTestExamUrl);



    }

}
