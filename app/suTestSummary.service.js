angular.module('app')
.factory('suTestSummaryService',
        ['$http', '$route', '$q', '$window',
          suTestSummaryService]);

function suTestSummaryService($http, $route, $q, $window) {

   return {
     
     getSuTestSummary : function() {

       $window.sessionStorage.suTestID = $route.current.params.suTestID;
       $window.sessionStorage.suTestMode = $route.current.params.suTestMode;
       $window.sessionStorage.suTestStartAt = $route.current.params.suTestStartAt;

       var suTestSummaryUrl = '/getSuTestSummary/'+$window.sessionStorage.userID+'/'+
                                 $route.current.params.suTestID+'/'+
                                 $route.current.params.suTestMode+'/'+
                                 $route.current.params.suTestStartAt;

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: suTestSummaryUrl,
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
