angular.module('app').controller('suTestTutorialModeCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                      suTestTutorialModeCtrl]);

function suTestTutorialModeCtrl($scope, $http, $routeParams,
                          $window, $location) {

  $scope.testID = $window.sessionStorage.testID;

}
