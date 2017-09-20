angular.module('app').factory('userAccountAdminService',
  ['$http', '$route', '$q', '$window', userAccountAdminService]);

function userAccountAdminService($http, $route, $q, $window) {

  /** to retrieve
   * 1. user identity
   * 2. current preference setting
   * 3. last log in
   * 4. current dashboard detail
   */

   return {
     getUserAccountAdmin : function() {

       var userAccountUrl = '/admin/userAccount/'+$route.current.params.userRole+
                         '/'+$route.current.params.userID;

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: userAccountUrl,
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
