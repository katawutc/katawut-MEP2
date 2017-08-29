angular.module('app').factory('profileSettingSuService', profileSettingSuService);

function profileSettingSuService($http, $route, $window, $q) {
  return {
      getProfileSettingSuData : function() {

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
