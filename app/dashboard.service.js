angular.module('app').factory('dashboardService', dashboardService);

function dashboardService($http, $route, $window, $q) {
  return {
    getDashboardData : function() {
      var dashboardDataUrl = '/dashboard/' + $window.sessionStorage.getItem('userID');

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
