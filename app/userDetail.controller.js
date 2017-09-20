angular.module('app').controller('userDetailCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                    'userDetail',userDetailCtrl]);

function userDetailCtrl($scope, $http, $routeParams,
                          $window, $location, userDetail) {

  $scope.userDetail = userDetail;
}
