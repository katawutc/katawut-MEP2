angular.module('app').controller('suTestHistoryCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                      'suTestHistory',
                                      suTestHistoryCtrl]);

function suTestHistoryCtrl($scope, $http, $routeParams,
                          $window, $location, suTestHistory) {

  $scope.userName = $window.sessionStorage.userName;

  // need to think when the array is very big, too big for looping; to do pagination
  for (var i=0; i<suTestHistory.length; i++) {
    var testDate = parseInt(suTestHistory[i].suTestStartAt);
    suTestHistory[i].testDate = (new Date(testDate)).toString();
    console.log(suTestHistory[i].testDate);
  }

  $scope.testHistory = suTestHistory;

}
