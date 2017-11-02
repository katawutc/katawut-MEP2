angular.module('app').controller('viewSuNoteCtrl',
                                ['$scope', '$http', '$routeParams',
                                 '$window', '$location',
                                 'suSecondNavBarMessageService',
                                 'viewSuNoteCtrl']);

function viewSuNoteCtrl($scope, $http, $routeParams,
                        $window, $location, suSecondNavBarMessageService) {


    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู';
    suSecondNavBarMessageService.setMessage(message);

}
