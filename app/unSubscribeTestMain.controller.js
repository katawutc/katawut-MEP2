angular.module('app')
.controller('unSubscribeTestMainCtrl',
           ['$scope', '$http',
            '$window', '$location',
            'testHeader',
             unSubscribeTestMainCtrl]);

function unSubscribeTestMainCtrl($scope, $http,
                                 $window, $location,
                                 testHeader) {

  // write the testHeader information after resolve
  // need to check null of testHeader
  $scope.testDescription = testHeader.testDescription;
  $window.sessionStorage.setItem('testID', testHeader.testID);
  $window.sessionStorage.setItem('testDescription', testHeader.testDescription);
  $window.sessionStorage.setItem('numberOfQuestion', testHeader.numberOfQuestion);

  // user selects tutorial mode
  $scope.startTestTutorialMode = function() {

    // defect when user log in but select the unSubscribe content, \
    // userName change to unSubscribe

    // log mode in sessionStorage
    $window.sessionStorage.setItem('testMode', 'tutorial');

    // clock in test starts
    $window.sessionStorage.setItem('testStartAt', Date.now());

    var registerData = { 'testID': $window.sessionStorage.testID,
                         'testMode': $window.sessionStorage.testMode,
                         'accessTime': $window.sessionStorage.testStartAt
                        }

    $http({
    url: 'unSubscribeUser/register',
    method: 'POST',
    data: registerData
    }).then(function successCallback(response) {
      $window.sessionStorage.setItem('userName', response.data.userName);
      $window.sessionStorage.setItem('userID', response.data.userID);

    }, function errorCallback(response) {
      $location.path('/errorPage');
    });

    var url = 'unSubscribeTest/tutorial/'+$window.sessionStorage.testID
                                         +'/1';
    $location.path(url);
  }

  $scope.startTestExamMode = function() {

    // defect when user log in but select the unSubscribe content, \
    // userName change to unSubscribe
    // if (loggin) use userName login

    // log mode in sessionStorage
    $window.sessionStorage.setItem('testMode', 'exam');

    // clock in test starts
    $window.sessionStorage.setItem('testStartAt', Date.now());

    var registerData = { 'testID': $window.sessionStorage.testID,
                         'testMode': $window.sessionStorage.testMode,
                         'accessTime': $window.sessionStorage.testStartAt
                        }
   /**
    * should register the unSubscribeUser here to get the user ID here \
    * using POST or POST service to insert unSubscribeUser
    */
    $http({
    url: 'unSubscribeUser/register',
    method: 'POST',
    data: registerData
    }).then(function successCallback(response) {
      $window.sessionStorage.setItem('userName', response.data.userName);
      $window.sessionStorage.setItem('userID', response.data.userID);

      createAnswerSheetExam();

    }, function errorCallback(response) {

      $location.path('/errorPage');
    });

    /**
     * Another http post here to insert answer sheet to all the question \
     * in the exam mode
     * then use update later for the real user answer
     */
     function createAnswerSheetExam() {

       var answerSheetExamData = {'userName': $window.sessionStorage.userName,
                                  'userID': $window.sessionStorage.userID,
                                  'testID': $window.sessionStorage.testID,
                                  'numberOfQuestion': $window.sessionStorage.numberOfQuestion,
                                  'testMode': $window.sessionStorage.testMode,
                                  'testStartAt': $window.sessionStorage.testStartAt};

       $http({
       url: 'createAnswerSheetExam',
       method: 'POST',
       data: answerSheetExamData
       }).then(function successCallback(response) {

         // go to the 1st question after empty answer sheet is created
         var url = 'unSubscribeTest/exam/'+$window.sessionStorage.testID
                                          +'/1'
         $location.path(url);

       }, function errorCallback(response) {

         $location.path('/errorPage');
       });
     }
  }
}
