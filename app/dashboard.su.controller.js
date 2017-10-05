angular.module('app').controller('dashboardSuCtrl',
  ['$scope', '$http', '$location', '$window', '$routeParams',
    'suAccountData', /*'suDashboardTest',*/ 'suNewTest', dashboardSuCtrl]);

function dashboardSuCtrl($scope, $http, $location, $window, $routeParams,
                          suAccountData,
                          /* suDashboardTest, */
                          suNewTest /* use suGenerateNewTest service*/) {

    /** dashboardData service duplicate with account.admn.service
     *  refactor to a new service name to be generic e.g. suAccountData service
     */

    if (suAccountData && suAccountData.errorMessage) {

      $window.sessionStorage.setItem('errorMessage', suAccountData.errorMessage);
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }
    else if (suAccountData && !suAccountData.errorMessage) {

      $scope.userName = suAccountData.userName;
      $scope.userID = suAccountData.userID;
      $scope.userRole = suAccountData.userRole;
    }
    else {
      $window.sessionStorage.setItem('errorMessage', 'No Authorization');
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }

    if (suNewTest) {

      console.log(suNewTest);

      $scope.dashboardTest1 = suNewTest.newTest1.suTestID;
      $scope.testID1 = suNewTest.newTest1.testID;
      $scope.testRunningNumber1 = suNewTest.newTest1.suTestNumber;

      $scope.dashboardTest2 = suNewTest.newTest2.suTestID;
      $scope.testID2 = suNewTest.newTest2.testID;
      $scope.testRunningNumber2 = suNewTest.newTest2.suTestNumber;
    }







/**
    if (suDashboardTest) {

      $scope.testRunningNumber01 = 01;
      $scope.testRunningNumber02 = 02;

      $scope.newTestID = suDashboardTest.userLevel+'-'+
                          suDashboardTest.userPreferTest+'-'+
                            suDashboardTest.userPreferSubject;

      $scope.dashboardTest1 = $scope.newTestID+'-'+$scope.testRunningNumber01;

      $scope.dashboardTest2 = $scope.newTestID+'-'+$scope.testRunningNumber02;
    }

    else {
      // other error case
    }

    */


  }
