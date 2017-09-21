angular.module('app').controller('loginHistoryAdminCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'loginHistoryAdmin', loginHistoryAdminCtrl]);

function loginHistoryAdminCtrl($scope, $http, $routeParams,
                          $window, $location, loginHistoryAdmin) {
  $scope.loginHistory = loginHistoryAdmin;
}
