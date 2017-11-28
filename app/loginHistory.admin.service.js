angular.module('app')
.factory('loginHistoryAdminService',
        ['$http', '$route', '$q', '$window',
          loginHistoryAdminService]);

function loginHistoryAdminService($http, $route, $q, $window) {

   return {
     getLoginHistoryAdmin : function() {

       var loginHistoryUrl = '/admin/loginHistory/'+$route.current.params.userRole+
                             '/'+$route.current.params.userID;

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: loginHistoryUrl,
         headers: {
           'Authorization': 'JWT ' + $window.sessionStorage.token
           }
       }).then(function successCallback(response) {
         deferred.resolve(response.data);
       },function errorCallback(response){

       });
       return  deferred.promise;
     },
     getLoginHistoryCountAdmin : function() {

       console.log('getLoginHistoryCount');

       var loginHistoryCountUrl = '/admin/loginHistoryCount/'+$route.current.params.userRole+
                                  '/'+$route.current.params.userID;

       var deferred = $q.defer();

       $http({
          method: 'GET',
          url: loginHistoryCountUrl,
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
