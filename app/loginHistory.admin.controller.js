angular.module('app')
.controller('loginHistoryAdminCtrl',
           ['$scope', '$route', '$http', '$window',
            'loginHistoryAdminService',
            'loginHistoryAdmin', 'accountAdmin', 'loginHistoryCount',
             loginHistoryAdminCtrl]);

function loginHistoryAdminCtrl($scope, $route, $http, $window,
                               loginHistoryAdminService,
                               loginHistoryAdmin, accountAdmin, loginHistoryCount) {

  // last ID of the current page
  var lastIDCurrentpage;
  var previousPage;

  $scope.maxSize = 5;
  $scope.bigTotalItems = loginHistoryCount;
  $scope.bigCurrentPage = 1;
  previousPage = $scope.bigCurrentPage;

  if (loginHistoryAdmin !== null) {

    $scope.loginHistory = loginHistoryAdmin;
    console.log(loginHistoryAdmin[loginHistoryAdmin.length-1]);

    lastIDCurrentpage = loginHistoryAdmin[loginHistoryAdmin.length-1]._id;
    console.log(lastIDCurrentpage);

  }

  if (accountAdmin !== null) {

    $scope.userAccount = accountAdmin;
  }

  console.log(loginHistoryCount);


  $scope.pageChanged = function() {

    console.log('previous page: '+ previousPage);

    console.log('Page changed to: ' + $scope.bigCurrentPage);

    console.log('Fetch data to display');

    var loginHistoryPageUrl = '/admin/loginHistoryPage/'+$route.current.params.userRole+'/'+
                                $route.current.params.userID+'/'+
                                lastIDCurrentpage+'/'+
                                previousPage+'/'+
                                $scope.bigCurrentPage;

    console.log(loginHistoryPageUrl);

    $http({
      method: 'GET',
      url: loginHistoryPageUrl,
      headers: {
        'Authorization': 'JWT ' + $window.sessionStorage.token
        }
    }).then(function successCallback(response) {

      $scope.loginHistory = response.data;

      previousPage = $scope.bigCurrentPage;

      lastIDCurrentpage = $scope.loginHistory[$scope.loginHistory.length-1]._id;
      console.log(lastIDCurrentpage);

    },function errorCallback(response){

    });

  }
}
