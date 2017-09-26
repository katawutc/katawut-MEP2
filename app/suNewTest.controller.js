angular.module('app').controller('suNewTestCtrl', ['$scope', '$http', '$routeParams',
                                    '$window', '$location', 'suNewTestInfo', suNewTestCtrl]);

function suNewTestCtrl($scope, $http, $routeParams,
                          $window, $location, suNewTestInfo) {

  console.log(suNewTestInfo);

  $scope.userID = suNewTestInfo.userID;

}
