angular.module('app').controller('suTestListCtrl',
  ['$scope', '$http', '$routeParams', '$window',
    '$location', 'suDashboardTest', suTestListCtrl]);

function suTestListCtrl ($scope, $http, $routeParams,
                          $window, $location, suDashboardTest) {

    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

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
