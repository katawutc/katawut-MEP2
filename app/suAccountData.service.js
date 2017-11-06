angular.module('app')
.factory('suAccountDataService',
        ['$http', '$route', '$q', '$window',
          suAccountDataService]);

function suAccountDataService($http, $route, $q, $window) {
  return {
      getSuAccountData : function() {

        console.log('at suAccountDataService: getSuAccountData');

        var suAccountDataUrl = '/accountData/su/'+$route.current.params.userID;

        var deferred = $q.defer();

        $http({
          url: suAccountDataUrl,
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
