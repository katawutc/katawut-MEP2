angular.module('app')
.controller('suTestListCtrl',
           ['$scope', '$window',
            'suDashboardTest',
            'suSecondNavBarMessageService',
             suTestListCtrl]);

function suTestListCtrl ($scope,
                         $window, suDashboardTest,
                         suSecondNavBarMessageService) {

    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรามาดู Test list กัน';
    suSecondNavBarMessageService.setMessage(message);
    /** */

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
