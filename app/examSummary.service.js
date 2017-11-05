angular.module('app')
.factory('examSummaryService',
        ['$http', '$q', '$window',
          examSummaryService]);

function examSummaryService($http, $q, $window) {

  return {
    getExamSummary : function() {

      var examSummaryUrl = '/getExamSummary/'+$window.sessionStorage.userID+
                           '/'+$window.sessionStorage.testID+
                           '/'+$window.sessionStorage.testMode+
                           '/'+$window.sessionStorage.testStartAt;

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: examSummaryUrl
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    }
  };
}
