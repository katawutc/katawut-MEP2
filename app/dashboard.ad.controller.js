angular.module('app')
.controller('dashboardAdCtrl',
           ['$scope', '$window', '$rootScope',
            'socketService',
            'adSecondNavBarMessageService',
             dashboardAdCtrl]);

function dashboardAdCtrl($scope, $window, $rootScope,
                         socketService,
                         adSecondNavBarMessageService) {

    /** ad emit socket connection */
    //socketService.emit('adConnect', $window.sessionStorage.userID);

    /** userVisit MEP socket ID */
    $rootScope.userVisitSocketID = [];

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู admin dashboard กัน';
    adSecondNavBarMessageService.setMessage(message);
    /** */

    /** initialize admin chat panel */
    $rootScope.showAdChatPanel = false;

    /** for adding and counting user visit MEP */
    socketService.on('userVisit', function(data) {

        console.log(data);
        $rootScope.userVisitSocketID.push(data);

        $scope.userVisitMEP = $rootScope.userVisitSocketID.length;
    })

    /** for deleting and couunting user visit MEP */
    socketService.on('userLeave', function (data) {

      console.log(data);

      var index = $rootScope.userVisitSocketID.indexOf(data);

      if (index > -1) {
        $rootScope.userVisitSocketID.splice(index, 1);
      }

      console.log($rootScope.userVisitSocketID);

      $scope.userVisitMEP = $rootScope.userVisitSocketID.length;

    })
}
