angular.module('app').controller('loginHistoryAdminCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'loginHistoryAdmin', 'accountAdmin',
                                      loginHistoryAdminCtrl]);

function loginHistoryAdminCtrl($scope, $http, $routeParams,
                          $window, $location, loginHistoryAdmin, accountAdmin) {
                            
  $scope.loginHistory = loginHistoryAdmin;
  $scope.userAccount = accountAdmin;
}
