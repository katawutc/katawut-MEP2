angular.module('app')
.controller('suTestHistoryCtrl',
           ['$scope',
            '$window',
            'suTestHistory',
            'suSecondNavBarMessageService',
             suTestHistoryCtrl]);

function suTestHistoryCtrl($scope,
                           $window,
                           suTestHistory,
                           suSecondNavBarMessageService) {

  $scope.userName = $window.sessionStorage.userName;

  $scope.userID = $window.sessionStorage.userID;

  /** set suSecondNavBarMessage */
  var message = 'สวัสดี '+ $window.sessionStorage.userName +
                ' เรา มาดู Test history กัน';
  suSecondNavBarMessageService.setMessage(message);
  /** */

  // need to think when the array is very big, too big for looping; to do pagination
  for (var i=0; i<suTestHistory.length; i++) {

    var testDate = parseInt(suTestHistory[i].suTestStartAt);
    suTestHistory[i].testDate = (new Date(testDate)).toString();

  }

  $scope.testHistory = suTestHistory;

}
