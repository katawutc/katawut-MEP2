angular.module('app').controller('userLoginHistoryAdminCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'userAccountAdmin', userLoginHistoryAdminCtrl]);

function userLoginHistoryAdminCtrl($scope, $http, $routeParams,
                          $window, $location, userAccountAdmin) {

  $scope.userAccount = userAccountAdmin;
}
