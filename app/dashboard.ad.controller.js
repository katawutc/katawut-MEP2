angular.module('app')
.controller('dashboardAdCtrl',
           ['$scope', '$location', '$window',
            'userList',
            'socketService',
             dashboardAdCtrl]);

function dashboardAdCtrl($scope, $location, $window,
                         userList,
                         socketService) {

    /** ad emit socket connection */
    socketService.emit('adConnect', $window.sessionStorage.userID);

    console.log(userList);

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
