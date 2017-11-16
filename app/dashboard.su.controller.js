angular.module('app')
.controller('dashboardSuCtrl',
           ['$scope', '$http', '$location', '$window', '$routeParams',
            'suAccountData', 'newSuTestID', 'socketService',
            'suSecondNavBarMessageService',
             dashboardSuCtrl]);

function dashboardSuCtrl($scope, $http, $location, $window, $routeParams,
                          suAccountData,
                          newSuTestID, /* use suGenerateNewTest service*/
                          socketService,
                          suSecondNavBarMessageService) {

    console.log('at dashboardSuCtrl');

    console.log(suAccountData);

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู Dashboard กัน';
    suSecondNavBarMessageService.setMessage(message);
    /** */


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

    if (newSuTestID) {

      $scope.dashboardTest1 = newSuTestID.newTest1.suTestID;
      $scope.testID1 = newSuTestID.newTest1.testID;
      $scope.testRunningNumber1 = newSuTestID.newTest1.suTestNumber;

      $scope.dashboardTest2 = newSuTestID.newTest2.suTestID;
      $scope.testID2 = newSuTestID.newTest2.testID;
      $scope.testRunningNumber2 = newSuTestID.newTest2.suTestNumber;
    }

  }
