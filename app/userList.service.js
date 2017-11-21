angular.module('app')
.factory('userListService',
        ['$http', '$window', '$q',
          userListService]);

function userListService($http, $window, $q) {
  return {

      getUserList : function() {

        var userListUrl = '/dashboard/ad/'+$window.sessionStorage.userID+'/userList';

        var deferred = $q.defer();

        /** get all the user list for the starter */
        $http({
          url: userListUrl,
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
