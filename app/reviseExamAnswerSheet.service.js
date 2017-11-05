angular.module('app')
.factory('reviseExamAnswerSheetService',
        ['$http', '$route', '$q',
          reviseExamAnswerSheetService]);

function reviseExamAnswerSheetService($http, $route, $q) {

  return {
    getCurrentUserAnswer : function() {

      var reviseExamAnswerUrl = '/reviseExamAnswerSheet/'
                                  +$route.current.params.userID+'/'
                                  +$route.current.params.testMode+'/'
                                  +$route.current.params.testStartAt+'/'
                                  +$route.current.params.testID+'/'
                                  +$route.current.params.questionNumber;

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: reviseExamAnswerUrl
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    },

    getReviseExamQuestion : function() {
      
      var getQuestionUrl = 'unSubscribeTest/'+$route.current.params.testMode+'/'
                            +$route.current.params.testID+'/'
                            +$route.current.params.questionNumber;

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: getQuestionUrl
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;

    }
  };
}
