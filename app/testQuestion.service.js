angular.module('app').factory('testQuestionService', testQuestionService);

function testQuestionService($http, $route, $q) {

  return {
    getTestQuestion : function() {

      var testQuestionUrl = '/unSubscribeTest/tutorial/'
        +$route.current.params.testID+'/'+$route.current.params.questionNumber;

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: testQuestionUrl
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    }
  };
}
