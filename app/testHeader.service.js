angular.module('app').factory('testHeaderService', testHeaderService);

function testHeaderService($http, $route, $q) {

  return {
    getTestHeader : function() {

      var testHeaderUrl = '/testHeader/'+ $route.current.params.testID;

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: testHeaderUrl
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    }
  };
}
