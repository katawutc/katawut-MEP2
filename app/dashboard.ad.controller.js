angular.module('app').controller('dashboardAdCtrl',
  ['$scope', '$http', '$location', '$window', '$routeParams',
  'userListData', dashboardAdCtrl]);

function dashboardAdCtrl($scope, $http, $location, $window, $routeParams, userListData) {

    /** get user list data*/
    if (userListData && userListData.errorMessage) {
      $window.sessionStorage.setItem('errorMessage', userListData.errorMessage);
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }
    else if (userListData && !userListData.errorMessage){
      $scope.userList = userListData;
    }
    else {
      $window.sessionStorage.setItem('errorMessage', 'No Authorization');
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }
}
