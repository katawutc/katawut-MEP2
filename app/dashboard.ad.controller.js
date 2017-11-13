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
    socketService.emit('adConnect', $window.sessionStorage.userID);

    $rootScope.adSentMessage = [];

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู admin dashboard กัน';
    adSecondNavBarMessageService.setMessage(message);
    /** */

    /** initialize admin chat panel */
    $rootScope.showAdChatPanel = false;


}
