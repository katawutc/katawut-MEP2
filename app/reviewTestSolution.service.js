angular.module('app').factory('reviewTestSolutionService', reviewTestSolutionService);

function reviewTestSolutionService($http, $route, $q) {

  return {
    getTestSolution : function() {

      var reviewTestSolutionUrl = '/reviewTestSolution/'+
                                    $route.current.params.testID+'/'+
                                    $route.current.params.questionNumber;

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: reviewTestSolutionUrl
      }).then(function successCallback(response) {
        deferred.resolve(response.data);
      },function errorCallback(response){

      });
      return  deferred.promise;
    }
  };
}
