angular.module('app').factory('suNewTestService',
  ['$http', '$route', '$q', '$window', suNewTestService]);

function suNewTestService($http, $route, $q, $window) {

   return {
     generateSuNewTest : function() {

       console.log('at generateSuNewTest');

       var generateSuNewTestUrl = '/generateSuNewTest/'+$window.sessionStorage.userID+'/'+
                                    $route.current.params.testID+'/'+
                                    $route.current.params.testRunningNumber;

       console.log(generateSuNewTestUrl);

       var deferred = $q.defer();

       $http({
         url: generateSuNewTestUrl,
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
