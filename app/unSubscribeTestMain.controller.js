angular.module('app').controller('unSubscribeTestMainCtrl', unSubscribeTestMainCtrl);

// put resolve with testHeader
function unSubscribeTestMainCtrl($scope, $http, $routeParams,
                                  $window, $location, testHeader) {

  // write the testHeader information after resolve
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

    var registerData = { testID: $window.sessionStorage.testID,
                         testMode: $window.sessionStorage.testMode,
                         accessTime: $window.sessionStorage.testStartAt
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

    var registerData = { testID: $window.sessionStorage.testID,
                         testMode: $window.sessionStorage.testMode,
                         accessTime: $window.sessionStorage.testStartAt
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

    }, function errorCallback(response) {
      console.log(response.status);
      $location.path('/errorPage');
    });

    /**
     * Another http post here to insert answer sheet to all the question \
     * in the exam mode
     * then use update later for the real user answer
     */

    // use $location here
    var url = 'unSubscribeTest/exam/'+$window.sessionStorage.testID
                                     +'/1'
    $location.path(url);
  }
}
