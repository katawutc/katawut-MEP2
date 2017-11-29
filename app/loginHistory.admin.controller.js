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
  var lastIDCurrentPage;
  var firstIDCurrentPage;
  var markIDCurrentPage;
  var previousPage;

  $scope.maxSize = 5;
  $scope.bigTotalItems = loginHistoryCount;
  $scope.bigCurrentPage = 1;
  previousPage = $scope.bigCurrentPage;

  // 1st page up logic
  if (loginHistoryAdmin !== null) {

    $scope.loginHistory = loginHistoryAdmin;
    console.log(loginHistoryAdmin[loginHistoryAdmin.length-1]);

    firstIDCurrentPage = loginHistoryAdmin[0]._id;
    console.log(firstIDCurrentPage);

    lastIDCurrentPage = loginHistoryAdmin[loginHistoryAdmin.length-1]._id;
    console.log(lastIDCurrentPage);

  }

  if (accountAdmin !== null) {

    $scope.userAccount = accountAdmin;
  }

  console.log(loginHistoryCount);


  $scope.pageChanged = function() {

    console.log('previous page: '+ previousPage);

    console.log('Page changed to: ' + $scope.bigCurrentPage);

    console.log('Fetch data to display');

    if (parseInt($scope.bigCurrentPage) > parseInt(previousPage)) {

      markIDCurrentPage = lastIDCurrentPage;
    }
    else if (parseInt($scope.bigCurrentPage) < parseInt(previousPage)) {

      markIDCurrentPage = firstIDCurrentPage;
    }



    var loginHistoryPageUrl = '/admin/loginHistoryPage/'+$route.current.params.userRole+'/'+
                                $route.current.params.userID+'/'+
                                markIDCurrentPage+'/'+
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

      console.log($scope.loginHistory);

      previousPage = $scope.bigCurrentPage;

      firstIDCurrentPage = $scope.loginHistory[0]._id;
      console.log(firstIDCurrentPage);

      lastIDCurrentPage = $scope.loginHistory[$scope.loginHistory.length-1]._id;
      console.log(lastIDCurrentPage);

    },function errorCallback(response){

    });

  }
}
