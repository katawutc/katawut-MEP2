angular.module('app')
.factory('suNewTestHeaderService',
        ['$http', '$route', '$q', '$window',
          suNewTestHeaderService]);

function suNewTestHeaderService($http, $route, $q, $window) {

   return {
     getSuNewTestHeader : function() {

        var newTestHeaderUrl = '/getSuNewTestHeader/'+$route.current.params.userID+
                                '/'+$route.current.params.testID+
                                '/'+$route.current.params.testRunningNumber;

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
