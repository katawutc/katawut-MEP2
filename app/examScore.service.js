angular.module('app').factory('examScoreService', examScoreService);

function examScoreService($http, $route, $q, $window) {

  return {
    getExamScore : function() {

      var examScoreUrl = '/getExamScore/'+$window.sessionStorage.userID+
                        '/'+$window.sessionStorage.testID+
                        '/'+$window.sessionStorage.testMode+
                        '/'+$window.sessionStorage.testStartAt;

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: examScoreUrl
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    }
  };
}
