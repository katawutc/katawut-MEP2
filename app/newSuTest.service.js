angular.module('app')
.factory('newSuTestService',
        ['$http', '$route', '$q', '$window',
          newSuTestService]);

function newSuTestService($http, $route, $q, $window) {

   return {

     generateNewSuTest : function() {

       var generateNewSuTestUrl = '/generateNewSuTest/'+$window.sessionStorage.userID+'/'+
                                    $route.current.params.testID+'/'+
                                    $route.current.params.testRunningNumber;

       var deferred = $q.defer();

       $http({
         url: generateNewSuTestUrl,
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
