angular.module('app').factory('testHeaderService', testHeaderService);

function testHeaderService($http, $route, $q) {

  return {
    getTestHeader : function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/testHeader/ONET-P6-Math-0001'
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    }
  };
}
