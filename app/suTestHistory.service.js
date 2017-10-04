angular.module('app').factory('suTestHistoryService',
  ['$http', '$route', '$q', '$window', suTestHistoryService]);

function suTestHistoryService($http, $route, $q, $window) {

   return {
     registerSuTestHistory : function() {

       console.log('at suTestHistoryService: registerSuTestHistory');

       var registerSuTestHistoryUrl = '/registerSuTestHistory/'+$window.sessionStorage.userID+'/'+
                                        $window.sessionStorage.suTestID+'/'+
                                        $window.sessionStorage.suTestMode+'/'+
                                        $window.sessionStorage.suTestStartAt;

       console.log(registerSuTestHistoryUrl);

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

     }
   }
 }
