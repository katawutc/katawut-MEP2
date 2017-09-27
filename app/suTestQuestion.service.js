angular.module('app').factory('suTestQuestionService',
  ['$http', '$route', '$q', '$window', suTestQuestionService]);

function suTestQuestionService($http, $route, $q, $window) {

   return {
     getSuTestQuestion : function() {

       var suTestQuestionUrl = '/getSuTestQuestion/'+
                                $window.sessionStorage.userID+'/'+
                                $route.current.params.testID+'/'+
                                $route.current.params.questionNumber;

       console.log(suTestQuestionUrl);

       console.log('at suTestQuestionService');

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: suTestQuestionUrl,
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
