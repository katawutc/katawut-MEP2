angular.module('app').factory('suNewTestHeaderService',
  ['$http', '$route', '$q', '$window', suNewTestHeaderService]);

function suNewTestHeaderService($http, $route, $q, $window) {

   return {
     getSuNewTestHeader : function() {

       /**
        * 1. get test ID
        * 2. get test header
        * 3. get test instruction
        */

        var newTestHeaderUrl = '/getSuNewTestHeader/'+$route.current.params.userID+
                              '/'+$route.current.params.testID;

        var deferred = $q.defer();

        $http({
          url: newTestHeaderUrl,
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
    }
 }
