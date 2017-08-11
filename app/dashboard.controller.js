angular.module('app').controller('dashboardCtrl', dashboardCtrl);

function dashboardCtrl($scope, $http, $location, $window, $routeParams) {

  // Use service to call to server to get private user information to display
  var url = '/dashboard/' + $window.sessionStorage.getItem('userID');

  console.log(url);
  // http get to retrieve user dashboard data
  $http({
  url: url,
  method: 'GET',
  headers: {
    'Authorization': 'JWT ' + $window.sessionStorage.token
    }
  }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available

    $scope.user = response.data.userName;
    $scope.email = response.data.userEmail;
    $scope.id = response.data._id;

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(response.status);
    $location.path('/errorPage');
  });
}
