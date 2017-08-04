angular.module('app').factory('testScoreService', testScoreService);

function testScoreService($http, $route, $q, $window) {

  return {
    getTestScore : function() {

      var testScoreUrl = '/getTestScoreUnSubscribeUser/'+$window.sessionStorage.userID+
                        '/'+$window.sessionStorage.testID+
                        '/'+$window.sessionStorage.testMode+
                        '/'+$window.sessionStorage.testStartAt;

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: testScoreUrl
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    }
  };
}
