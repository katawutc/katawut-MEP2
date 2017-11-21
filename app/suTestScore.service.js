angular.module('app')
.factory('suTestScoreService',
        ['$http', '$q', '$window',
          suTestScoreService]);

function suTestScoreService($http, $q, $window) {

   return {
     getSuTestScore : function() {

       var suTestScoreUrl = '/getSuTestScore/'+$window.sessionStorage.userID+'/'+
                              $window.sessionStorage.suTestID+'/'+
                              $window.sessionStorage.suTestMode+'/'+
                              $window.sessionStorage.suTestStartAt;
                              
       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: suTestScoreUrl,
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
