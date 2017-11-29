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

    /**
      * 1. if page change is next to the previous one
      * 1a. if page is greater than the previous one
      * 1b. if page is lesser than the previous one
      * 2. if page change is not next to the previous one
      */

    console.log('Fetch data to display');

    /*

    var pageData = loginHistoryAdminService.getPageData(lastIDCurrentpage,
                                                        previousPage,
                                                        $scope.bigCurrentPage);

    console.log(pageData);

    if (pageData) {

      $scope.loginHistory = pageData.$$state.value;
    }
    */

    var loginHistoryPageUrl = '/admin/loginHistoryPage/'+$route.current.params.userRole+'/'+
                                $route.current.params.userID+'/'+
                                lastIDCurrentpage;

    //var deferred = $q.defer();

    $http({
      method: 'GET',
      url: loginHistoryPageUrl,
      headers: {
        'Authorization': 'JWT ' + $window.sessionStorage.token
        }
    }).then(function successCallback(response) {

      //deferred.resolve(response.data);

      $scope.loginHistory = response.data;

    },function errorCallback(response){

    });


    previousPage = $scope.bigCurrentPage;

  }
}
