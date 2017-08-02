angular.module('app').controller('unSubscribeTestMainCtrl', unSubscribeTestMainCtrl);

function unSubscribeTestMainCtrl($scope, $http, $routeParams, $window, $location) {

  // Refactor test header to be service
  var url = '/testHeader/'+$routeParams.testID;

  // Test Header and description will be displayed here.
  $http({
  url: url,
  method: 'GET',
  }).then(function successCallback(response) {
    $scope.testDescription = response.data.testDescription;
    $window.sessionStorage.setItem('testID', response.data.testID);
    $window.sessionStorage.setItem('testDescription', response.data.testDescription);
    $window.sessionStorage.setItem('numberOfQuestion', response.data.numberOfQuestion);

  }, function errorCallback(response) {
    console.log(response.status);
    $location.path('/errorPage');
  });

  $scope.startTestTutorialMode = function() {
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
      console.log(response.status);
      $location.path('/errorPage');
    });

    var url = 'unSubscribeTest/tutorial/'+$window.sessionStorage.testID
                                         +'/1';
    $location.path(url);
  }

  $scope.startTestExamMode = function() {
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

    // use $location here
    var url = 'unSubscribeTest/exam/'+$window.sessionStorage.testID
                                     +'/1'
    $location.path(url);
  }
}
