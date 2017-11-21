angular.module('app').factory('lastLoginAdminService',
  ['$http', '$route', '$q', '$window', lastLoginAdminService]);

function lastLoginAdminService($http, $route, $q, $window) {

   return {
     getLastLoginAdmin : function() {

       var userLastLoginUrl = '/admin/lastLogin/'+$route.current.params.userRole+
                              '/'+$route.current.params.userID;

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: userLastLoginUrl,
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
