angular.module('app').factory('preferenceSettingSuService',
  ['$http', '$route', '$window', '$q', preferenceSettingSuService]);

function preferenceSettingSuService($http, $route, $window, $q) {
  return {
      getPreferenceSettingSuData : function() {

        var preferenceSettingUrl = 'preferenceSetting/su/'+$window.sessionStorage.userID;

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
