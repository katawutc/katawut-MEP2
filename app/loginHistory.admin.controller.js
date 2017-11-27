angular.module('app')
.controller('loginHistoryAdminCtrl',
           ['$scope', '$http', '$routeParams',
            '$window', '$location',
            'loginHistoryAdmin', 'accountAdmin',
             loginHistoryAdminCtrl]);

function loginHistoryAdminCtrl($scope, $http, $routeParams,
                               $window, $location,
                               loginHistoryAdmin, accountAdmin) {

  if (loginHistoryAdmin !== null) {

    $scope.loginHistory = loginHistoryAdmin;
  }

  if (accountAdmin !== null) {
    
    $scope.userAccount = accountAdmin;
  }

}
