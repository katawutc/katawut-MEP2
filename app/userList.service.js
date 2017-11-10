angular.module('app')
.factory('userListService',
        ['$http', '$window', '$q',
          userListService]);

function userListService($http, $window, $q) {
  return {

      getUserList : function() {

        console.log('at userListService');

        console.log($window.sessionStorage.userID);

        var userListUrl = '/dashboard/ad/'+$window.sessionStorage.userID+'/userList';

        console.log(userListUrl);

        var deferred = $q.defer();

        /** get all the user list for the starter */
        $http({
          url: userListUrl,
          method: 'GET',
          headers: {
            'Authorization': 'JWT ' + $window.sessionStorage.token
            }
        }).then(function successCallback(response) {

          console.log(response.data);

          deferred.resolve(response.data);

        },function errorCallback(response){

        });
        return  deferred.promise;
    }
  };
}
