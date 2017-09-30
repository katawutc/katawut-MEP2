angular.module('app').controller('dashboardSuCtrl',
  ['$scope', '$http', '$location', '$window', '$routeParams',
    'suAccountData', 'suDashboardTest', dashboardSuCtrl]);

function dashboardSuCtrl($scope, $http, $location, $window, $routeParams,
                          suAccountData, suDashboardTest) {

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

    if (suDashboardTest /*&& !suDashboardTest.errorMessage*/) {

      // test running number
      // to refactor for auto run
      $scope.testRunningNumber01 = 01;
      $scope.testRunningNumber02 = 02;

      $scope.newTestID = suDashboardTest.userLevel+'-'+
                          suDashboardTest.userPreferTest+'-'+
                            suDashboardTest.userPreferSubject;

      $scope.dashboardTest1 = $scope.newTestID+'-'+$scope.testRunningNumber01;

      $scope.dashboardTest2 = $scope.newTestID+'-'+$scope.testRunningNumber02;
    }
    /*
    else if (suDashboardTest.errorMessage) {
      $window.sessionStorage.setItem('errorMessage', suDashboardTest.errorMessage);
      $location.path('/errorPage');
    }*/
    else {
      // other error case
    }

    /*
    $scope.openChatPanel = function() {
      console.log('open chat panel');
    }
    */

  }
