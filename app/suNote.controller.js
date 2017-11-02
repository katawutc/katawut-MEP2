angular.module('app')
.controller('suNoteCtrl',
           ['$scope', '$http', '$routeParams',
            '$window', '$location',
            'suSecondNavBarMessageService',
            'suNote',
             suNoteCtrl]);

function suNoteCtrl($scope, $http, $routeParams,
                    $window, $location, suSecondNavBarMessageService,
                    suNote) {


    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู';
    suSecondNavBarMessageService.setMessage(message);

    console.log(suNote);

}
