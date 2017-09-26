angular.module('app').factory('suAccountDataService',
  ['$http', '$route', '$window', '$q', suAccountDataService]);

function suAccountDataService($http, $route, $window, $q) {
  return {
      getSuAccountData : function() {

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
