angular.module('app')
.controller('adminUserListCtrl',
           ['$scope', '$location', '$window',
            'userList',
             adminUserListCtrl]);

function adminUserListCtrl($scope, $location, $window,
                           userList) {

    /** get user list data*/
    if (userList && userList.errorMessage) {
      $window.sessionStorage.setItem('errorMessage', userList.errorMessage);
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }
    else if (userList && !userList.errorMessage){
      $scope.userList = userList;
    }
    else {
      $window.sessionStorage.setItem('errorMessage', 'No Authorization');
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }
}
