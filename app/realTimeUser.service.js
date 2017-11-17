angular.module('app')
.factory('realTimeUserService',
        ['$http', '$route', '$q', '$window',
          realTimeUserService]);

function realTimeUserService($http, $route, $q, $window) {

   return {
     getDefaultUser : function() {

       var realTimeDefaultUserUrl = 'realTimeUser/default/'+$window.sessionStorage.userID;

       var deferred = $q.defer();

       $http({
         url: realTimeDefaultUserUrl,
         method: 'GET',
         headers: {
           'Authorization': 'JWT ' + $window.sessionStorage.token
           }
       }).then(function successCallback(response) {

         deferred.resolve(response.data);

       },function errorCallback(response){

       });
       return  deferred.promise;

     },
     getSuUser : function() {

       var realTimeSuUserUrl = 'realTimeUser/su/'+$window.sessionStorage.userID;

       var deferred = $q.defer();

       $http({
         url: realTimeSuUserUrl,
         method: 'GET',
         headers: {
           'Authorization': 'JWT ' + $window.sessionStorage.token
           }
       }).then(function successCallback(response) {

         deferred.resolve(response.data);

       },function errorCallback(response){

       });
       return  deferred.promise;

     },
     getAdUser : function() {

       var realTimeAdUserUrl = 'realTimeUser/ad/'+$window.sessionStorage.userID;

       var deferred = $q.defer();

       $http({
         url: realTimeAdUserUrl,
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
