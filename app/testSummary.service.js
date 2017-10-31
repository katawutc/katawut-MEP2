angular.module('app')
.factory('testSummaryService',
        ['$http', '$q', '$window',
          testSummaryService]);

function testSummaryService($http, $q, $window) {

  return {
    getTestSummary : function() {

      var testSummaryUrl = '/getTestSummaryUnSubscribeUser/'+$window.sessionStorage.userID+
                            '/'+$window.sessionStorage.testID+
                            '/'+$window.sessionStorage.testMode+
                            '/'+$window.sessionStorage.testStartAt;

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: testSummaryUrl
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    }
  };
}
