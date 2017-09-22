angular.module('app').controller('dashboardSuCtrl',
  ['$scope', '$http', '$location', '$window', '$routeParams',
    'dashboardData', 'suDashboardTest', dashboardSuCtrl]);

function dashboardSuCtrl($scope, $http, $location, $window, $routeParams,
                          dashboardData, suDashboardTest) {

    /** dashboardData service duplicate with account.admn.service
     *  refactor to a new service name to be generic e.g. suAccountData service
     */

    if (dashboardData && dashboardData.errorMessage) {

      $window.sessionStorage.setItem('errorMessage', dashboardData.errorMessage);
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }
    else if (dashboardData && !dashboardData.errorMessage) {

      $scope.userName = dashboardData.userName;
      $scope.userRole = dashboardData.userRole;
    }
    else {
      $window.sessionStorage.setItem('errorMessage', 'No Authorization');
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }

    if (suDashboardTest /*&& !suDashboardTest.errorMessage*/) {
      $scope.dashboardTest1 = suDashboardTest.userLevel+'-'+
                              suDashboardTest.userPreferTest+'-'+
                              suDashboardTest.userPreferSubject+'-01';



      $scope.dashboardTest2 = suDashboardTest.userLevel+'-'+
                              suDashboardTest.userPreferTest+'-'+
                              suDashboardTest.userPreferSubject+'-02';
    }
    /*
    else if (suDashboardTest.errorMessage) {
      $window.sessionStorage.setItem('errorMessage', suDashboardTest.errorMessage);
      $location.path('/errorPage');
    }*/
    else {
      // other error case
    }
  }
