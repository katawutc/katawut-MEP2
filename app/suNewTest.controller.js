angular.module('app').controller('suNewTestCtrl', ['$scope', '$http', '$route',
                                    '$window', '$location',
                                    'suNewTestInfo', 'suNewTestHeader',
                                    'newSuTest',
                                      suNewTestCtrl]);

function suNewTestCtrl($scope, $http, $route,
                          $window, $location,
                          suNewTestInfo, suNewTestHeader, newSuTest) {

    // to separate testID and test running number
    $scope.testID = $route.current.params.testID;
    //$scope.suTestID = suNewTestInfo.suTestID;
    $scope.testDescription = suNewTestHeader.testDescription;

    console.log(newSuTest);
    if (newSuTest) {

      $scope.suTestID = newSuTest.suTestID;
    }

    $scope.startTestTutorialMode = function() {

      $window.sessionStorage.testID = $scope.testID;
      $window.sessionStorage.suTestID = $scope.suTestID; // suTestID
      $window.sessionStorage.suTestMode = 'tutorial';
      $window.sessionStorage.suTestSize = newSuTest.suTestSize;
      $window.sessionStorage.suTestStartAt =  Date.now();

      createAnswerSheetTutorial();

      function createAnswerSheetTutorial() {
        console.log('creating createAnswerSheetTutorial');

        var suAnswerSheetTutorialData = {userID: $window.sessionStorage.userID,
                                          testID: $window.sessionStorage.testID,
                                          suTestID: $window.sessionStorage.suTestID,
                                          suTestSize: $window.sessionStorage.suTestSize,
                                          suTestMode: $window.sessionStorage.suTestMode,
                                          suTestStartAt: $window.sessionStorage.suTestStartAt};

        console.log(suAnswerSheetTutorialData);

        // create su exam sheet in the suTestHistory collection DB
        var suExamSheetUrl = '/createSuExamSheet/'+$window.sessionStorage.userID+'/'+
                               $window.sessionStorage.suTestID;

        $http({
          url: suExamSheetUrl,
          method: 'POST',
          data: suAnswerSheetTutorialData,
          headers: {
            'Authorization': 'JWT ' + $window.sessionStorage.token
            }
         }).then(function successCallback(response) {
           console.log('return from create the answer sheet');

           // go to the 1st question after empty answer sheet is created
           var suTestTutorialUrl = '/suTest/tutorialMode/'+$window.sessionStorage.userID+'/'+
                                       $scope.suTestID+'/'+1;

           $location.path(suTestTutorialUrl);

         }, function errorCallback(response) {
           console.log(response.status);
           $location.path('/errorPage');
         });
       }
     }

    $scope.startTestExamMode = function() {

      console.log('start su test Exam mode');

      $window.sessionStorage.testID = $scope.testID;  // testID
      $window.sessionStorage.suTestID = $scope.suTestID; // suTestID
      $window.sessionStorage.suTestMode = 'exam';
      $window.sessionStorage.suTestSize = newSuTest.suTestSize;
      $window.sessionStorage.suTestStartAt =  Date.now();

      createAnswerSheetExam();

      /**
       * Another http post here to insert answer sheet to all the question \
       * in the exam mode
       * then use update later for the real user answer
       */
       function createAnswerSheetExam() {
         console.log('creating createAnswerSheetExam');

         var suAnswerSheetExamData = {userID: $window.sessionStorage.userID,
                                      testID: $window.sessionStorage.testID,
                                      suTestID: $window.sessionStorage.suTestID,
                                      suTestSize: $window.sessionStorage.suTestSize,
                                      suTestMode: $window.sessionStorage.suTestMode,
                                      suTestStartAt: $window.sessionStorage.suTestStartAt};

         console.log(suAnswerSheetExamData);

         // create su exam sheet in the suTestHistory collection DB
         var suExamSheetUrl = '/createSuExamSheet/'+$window.sessionStorage.userID+'/'+
                                $window.sessionStorage.suTestID;

         $http({
           url: suExamSheetUrl,
           method: 'POST',
           data: suAnswerSheetExamData,
           headers: {
             'Authorization': 'JWT ' + $window.sessionStorage.token
             }
          }).then(function successCallback(response) {
            console.log('return from create the answer sheet');

            // go to the 1st question after empty answer sheet is created
            var suTestExamUrl = '/suTest/examMode/'+$window.sessionStorage.userID+'/'+
                                       $scope.suTestID+'/'+1;

            $location.path(suTestExamUrl);

          }, function errorCallback(response) {
            console.log(response.status);
            $location.path('/errorPage');
          });
        }
      }
  }
