angular.module('app')
.factory('answerSummaryService',
        ['$http', '$q', '$window',
          answerSummaryService]);

function answerSummaryService($http, $q, $window) {

  return {
    getAnswerSummary : function() {

      var answerSummaryUrl = '/getAnswerSummary/'+$window.sessionStorage.userID+
                             '/'+$window.sessionStorage.testID+
                             '/'+$window.sessionStorage.testMode+
                             '/'+$window.sessionStorage.testStartAt;

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: answerSummaryUrl
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    }
  };
}
