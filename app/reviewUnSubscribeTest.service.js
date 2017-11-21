angular.module('app')
.factory('reviewUnSubscribeTestService',
        ['$http', '$route', '$q',
          reviewUnSubscribeTestService]);

function reviewUnSubscribeTestService($http, $route, $q) {

  return {
    getReviewQuestion : function() {

      var reviewUnSubscribeTestUrl = '/reviewUnSubscribeTest/'+
                                       $route.current.params.testID+'/'+
                                       $route.current.params.questionNumber;

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: reviewUnSubscribeTestUrl
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    }
  };
}
