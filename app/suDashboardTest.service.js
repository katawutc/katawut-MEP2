angular.module('app').factory('suDashboardTestService',
  ['$http', '$route', '$q', '$window', suDashboardTestService]);

function suDashboardTestService($http, $route, $q, $window) {

   return {
     getSuDashboardTest : function() {

       var preferenceSettingUrl = 'preferenceSetting/su/'+$window.sessionStorage.userID;

       console.log(preferenceSettingUrl);

       var deferred = $q.defer();

       $http({
         url: preferenceSettingUrl,
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
