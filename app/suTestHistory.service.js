angular.module('app').factory('suTestHistoryService',
  ['$http', '$route', '$q', '$window', suTestHistoryService]);

function suTestHistoryService($http, $route, $q, $window) {

   return {
     registerSuTestHistory : function() {

       var registerSuTestHistoryUrl = '/registerSuTestHistory/'+$window.sessionStorage.userID+'/'+
                                        $window.sessionStorage.suTestID+'/'+
                                        $window.sessionStorage.suTestMode+'/'+
                                        $window.sessionStorage.suTestStartAt;

       var deferred = $q.defer();

       $http({
         url: registerSuTestHistoryUrl,
         method: 'POST',
         headers: {
           'Authorization': 'JWT ' + $window.sessionStorage.token
           }
       }).then(function successCallback(response) {

         deferred.resolve(response.data);

       },function errorCallback(response){

       });
       return  deferred.promise;
     },

     getSuTestHistory : function() {

       console.log('at suTestHistoryService: getSuTestHistory');

       var getSuTestHistoryUrl = '/getSuTestHistory/'+$window.sessionStorage.userID;

       console.log(getSuTestHistoryUrl);

       var deferred = $q.defer();

       $http({
         url: getSuTestHistoryUrl,
         method: 'GET',
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
