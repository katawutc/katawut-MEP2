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


    console.log(suNewTest);





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
