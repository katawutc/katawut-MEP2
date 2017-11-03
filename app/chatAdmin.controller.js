angular.module('app')
.controller('chatAdminCtrl',
           ['$scope', '$http', '$routeParams',
            '$window', '$location',
            'chatUserList',
             chatAdminCtrl]);

function chatAdminCtrl($scope, $http, $routeParams,
                       $window, $location, chatUserList) {



    /** get user list data*/
    if (chatUserList && chatUserList.errorMessage) {

      $window.sessionStorage.setItem('errorMessage', chatUserList.errorMessage);
      $location.path('/errorPage');
    }
    else if (chatUserList && !chatUserList.errorMessage){

      $scope.userList = chatUserList;
    }
    else {
      $window.sessionStorage.setItem('errorMessage', 'No Authorization');
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }

    /** implement admin select user to chat to */

    $scope.adminChatTo = function(userID) {

      console.log('open the chat panel');

      console.log('admin selects '+ userID);

    }

}
