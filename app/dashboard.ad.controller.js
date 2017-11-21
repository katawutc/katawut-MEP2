angular.module('app')
.controller('dashboardAdCtrl',
           ['$scope', '$window', '$rootScope',
            'socketService',
            'adSecondNavBarMessageService',
            'defaultUser', 'suUser', 'adUser',
             dashboardAdCtrl]);

function dashboardAdCtrl($scope, $window, $rootScope,
                         socketService,
                         adSecondNavBarMessageService,
                         defaultUser, suUser, adUser) {

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู admin dashboard กัน';
    adSecondNavBarMessageService.setMessage(message);
    /** */

    /** initialize admin chat panel */
    $rootScope.showAdChatPanel = false;

    /** initialize dashboard real time user data */
    $scope.userVisitMEP = defaultUser;
    $scope.suVisitMEP = suUser;
    $scope.adVisitMEP = adUser;

    /** for adding and counting default user visit MEP */
    socketService.on('defaultVisit', function(data) {

        $scope.userVisitMEP = data;
    })

    /** for adding and counting su visit MEP */
    socketService.on('suVisit', function(data) {

        $scope.suVisitMEP = data;
    })

    /** for adding and counting admin visit MEP */
    socketService.on('adVisit', function(data) {

        $scope.adVisitMEP = data;
    })

}
