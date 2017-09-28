angular.module('app').factory('suTestSummaryService',
  ['$http', '$route', '$q', '$window', suTestSummaryService]);

function suTestSummaryService($http, $route, $q, $window) {

   return {
     getSuTestSummary : function() {

       var suTestSummaryUrl = '/getSuTestSummary/'+$window.sessionStorage.userID+'/'+
                                 $window.sessionStorage.suTestID+'/'+
                                 $window.sessionStorage.suTestMode+'/'+
                                 $window.sessionStorage.suTestStartAt;

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
