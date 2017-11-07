angular.module('app')
.controller('accountAdminCtrl',
           ['$scope',
            'accountAdmin', 'settingAdmin', 'lastLoginAdmin',
             accountAdminCtrl]);

function accountAdminCtrl($scope,
                          accountAdmin, settingAdmin, lastLoginAdmin) {

  $scope.userAccount = accountAdmin;
  $scope.userSetting = settingAdmin;
  $scope.userLastLogin = lastLoginAdmin;
}
