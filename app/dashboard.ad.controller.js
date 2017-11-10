angular.module('app')
.controller('dashboardAdCtrl',
           ['$scope', '$window',
            'socketService',
            'adSecondNavBarMessageService',
             dashboardAdCtrl]);

function dashboardAdCtrl($scope, $window,
                         socketService,
                         adSecondNavBarMessageService) {

    /** ad emit socket connection */
    socketService.emit('adConnect', $window.sessionStorage.userID);

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู admin dashboard กัน';
    adSecondNavBarMessageService.setMessage(message);
    /** */


}
