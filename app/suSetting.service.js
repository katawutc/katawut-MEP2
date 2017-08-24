angular.module('app').factory('suSettingService', suSettingService);

function suSettingService($http, $route, $window, $q) {
  return {
      getSuSettingData : function() {

        var suSettingUrl = 'setting/su/'+$window.sessionStorage.userID;

        var deferred = $q.defer();

        $http({
          url: suSettingUrl,
          method: 'GET',
          headers: {
            'Authorization': 'JWT ' + $window.sessionStorage.token
            }
        }).then(function successCallback(response) {

          console.log('su setting returns');

          deferred.resolve(response.data);

        },function errorCallback(response){

        });
        return  deferred.promise;
      }
  }
}
