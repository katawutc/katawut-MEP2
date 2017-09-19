angular.module('app').factory('userDetailService',
  ['$http', '$route', '$q', '$window', userDetailService]);

function userDetailService($http, $route, $q, $window) {

  /** to retrieve
   * 1. user identity
   * 2. current preference setting
   * 3. last log in
   * 4. current dashboard detail
   */

   console.log($route.current.params.userRole);
   console.log($route.current.params.userID);

   return {
     getUserDetail : function() {

       var userDetailUrl = '/getUserDetail/'+$route.current.params.userRole+
                         '/'+$route.current.params.userID;

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: userDetailUrl,
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
