angular.module('app').factory('settingAdminService',
  ['$http', '$route', '$q', '$window', settingAdminService]);

function settingAdminService($http, $route, $q, $window) {

   return {
     getSettingAdmin : function() {

       var userSettingUrl = '/admin/setting/'+$route.current.params.userRole+
                         '/'+$route.current.params.userID;

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: userSettingUrl,
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
