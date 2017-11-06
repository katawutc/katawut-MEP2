angular.module('app')
.factory('suTestReviewService',
        ['$http', '$route', '$q', '$window',
          suTestReviewService]);

function suTestReviewService($http, $route, $q, $window) {

   return {
     getSuTestReview : function() {

       var suTestReviewUrl = '/getSuTestReview/'+$window.sessionStorage.userID+'/'+
                                $route.current.params.suTestID+'/'+
                                $route.current.params.suTestQuestionNumber;

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: suTestReviewUrl,
         headers: {
           'Authorization': 'JWT ' + $window.sessionStorage.token
           }
       }).then(function successCallback(response) {
         deferred.resolve(response.data);
       },function errorCallback(response){

       });
       return  deferred.promise;
     }
   }
 }
