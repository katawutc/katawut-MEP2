angular.module('app')
.controller('loginHistoryAdminCtrl',
           ['$scope', '$log',
            'loginHistoryAdmin', 'accountAdmin', 'loginHistoryCount',
             loginHistoryAdminCtrl]);

function loginHistoryAdminCtrl($scope, $log,
                               loginHistoryAdmin, accountAdmin, loginHistoryCount) {

  if (loginHistoryAdmin !== null) {

    $scope.loginHistory = loginHistoryAdmin;
  }

  if (accountAdmin !== null) {

    $scope.userAccount = accountAdmin;
  }

  console.log(loginHistoryCount);


  //$scope.totalItems = 64;
  //$scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {

    console.log('Page changed to: ' + $scope.bigCurrentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = loginHistoryCount;
  $scope.bigCurrentPage = 1;

  console.log($scope.bigCurrentPage);
  console.log($scope.numPages);


}
