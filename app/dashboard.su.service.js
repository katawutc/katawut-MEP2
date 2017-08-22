angular.module('app').factory('dashboardSuService', dashboardSuService);

function dashboardSuService($http, $route, $window, $q) {
  return {
      getDashboardData : function() {

      var dashboardDataUrl = '/dashboard/su/'+$route.current.params.userID;

      var deferred = $q.defer();

      $http({
        url: dashboardDataUrl,
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
  };
}
