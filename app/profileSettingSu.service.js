angular.module('app').factory('profileSettingSuService',
  ['$http', '$route', '$window', '$q', profileSettingSuService]);

function profileSettingSuService($http, $route, $window, $q) {
  return {
      getProfileSettingSuData : function() {

        var profileSettingUrl = 'profileSetting/su/'+$window.sessionStorage.userID;

        var deferred = $q.defer();

        $http({
          url: profileSettingUrl,
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
