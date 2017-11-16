angular.module('app')
.controller('dashboardAdCtrl',
           ['$scope', '$window', '$rootScope',
            'socketService',
            'adSecondNavBarMessageService',
             dashboardAdCtrl]);

function dashboardAdCtrl($scope, $window, $rootScope,
                         socketService,
                         adSecondNavBarMessageService) {

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
    socketService.on('defaultUserVisit', function(data) {

        console.log(data);

        $scope.userVisitMEP = data;
    })

}
