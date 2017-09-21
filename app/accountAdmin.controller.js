angular.module('app').controller('accountAdminCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'accountAdmin', accountAdminCtrl]);

function accountAdminCtrl($scope, $http, $routeParams,
                          $window, $location, accountAdmin) {

  $scope.userAccount = accountAdmin;
}
