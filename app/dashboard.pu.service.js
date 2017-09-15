angular.module('app').factory('dashboardPuService',
  ['$http', '$route', '$window', '$q', dashboardPuService]);

function dashboardPuService($http, $route, $window, $q) {
  return {
      getDashboardData : function() {

      var dashboardDataUrl = '/dashboard/pu/'+$route.current.params.userID;

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
