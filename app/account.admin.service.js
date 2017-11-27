angular.module('app')
.factory('accountAdminService',
        ['$http', '$route', '$q', '$window',
          accountAdminService]);

function accountAdminService($http, $route, $q, $window) {

   return {
     getAccountAdmin : function() {

       var userAccountUrl = '/admin/account/'+$route.current.params.userRole+
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
