angular.module('app')
.factory('liveSuService',
        ['$http', '$route', '$q', '$window',
          liveSuService]);

function liveSuService($http, $route, $q, $window) {

   return {
     getLiveSu : function() {

       var liveSuUrl = 'liveSu/'+$window.sessionStorage.userID;

       var deferred = $q.defer();

       $http({
         url: liveSuUrl,
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
