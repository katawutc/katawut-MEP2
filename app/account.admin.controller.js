angular.module('app').controller('accountAdminCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'accountAdmin', 'settingAdmin', 'lastLoginAdmin',
                                      accountAdminCtrl]);

function accountAdminCtrl($scope, $http, $routeParams,
                          $window, $location,
                          accountAdmin, settingAdmin, lastLoginAdmin) {

  $scope.userAccount = accountAdmin;
  $scope.userSetting = settingAdmin;
  $scope.userLastLogin = lastLoginAdmin;
}
