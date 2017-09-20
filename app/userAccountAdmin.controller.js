angular.module('app').controller('userAccountAdminCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'userAccountAdmin',userAccountAdminCtrl]);

function userAccountAdminCtrl($scope, $http, $routeParams,
                          $window, $location, userAccountAdmin) {

  $scope.userAccount = userAccountAdmin;
}
