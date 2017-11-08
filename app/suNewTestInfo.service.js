angular.module('app')
.factory('suNewTestInfoService',
        ['$http', '$route', '$q', '$window',
          suNewTestInfoService]);

function suNewTestInfoService($http, $route, $q, $window) {

   return {
     getSuNewTestInfo : function() {

        var newTestInfoUrl = '/getSuNewTestInfo/'+$route.current.params.userID+
                              '/'+$route.current.params.testID+
                              '/'+$route.current.params.testRunningNumber;

        var deferred = $q.defer();

        $http({
          url: newTestInfoUrl,
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
