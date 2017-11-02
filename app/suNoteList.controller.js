angular.module('app')
.controller('suNoteListCtrl',
           ['$scope', '$http', '$routeParams', '$window',
            '$location',
            'suSecondNavBarMessageService',
             suNoteListCtrl]);

function suNoteListCtrl ($scope, $http, $routeParams,
                         $window, $location,
                         suSecondNavBarMessageService) {

    $scope.userName = $window.sessionStorage.userName;
    $scope.userID = $window.sessionStorage.userID;

    /** set suSecondNavBarMessage */
    var message = 'สวัสดี '+ $window.sessionStorage.userName +
                  ' เรา มาดู note list กัน';
    suSecondNavBarMessageService.setMessage(message);




  }
