angular.module('app').controller('dashboardAdCtrl', dashboardAdCtrl);

function dashboardAdCtrl($scope, $http, $location, $window, $routeParams, userListData) {

    /** get user list data*/
    if (userListData) {
      $scope.userList = userListData;
  }
  else {
    $window.sessionStorage.setItem('errorMessage', 'No Authorization');
    $window.sessionStorage.setItem('logInMessage', 'login fail');
    $location.path('/errorPage');
  }
}
