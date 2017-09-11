angular.module('app').factory('userListDataService', userListDataService);

function userListDataService($http, $route, $window, $q) {
  return {
      getUserListData : function() {

      var userListDataUrl = '/dashboard/ad/'+$route.current.params.userID
                                +'/userList';

      var deferred = $q.defer();

      /** get all the user list for the starter */
      $http({
        url: userListDataUrl,
        method: 'GET',
        headers: {
          'Authorization': 'JWT ' + $window.sessionStorage.token
          }
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    }
  };
}
