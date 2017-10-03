angular.module('app').factory('reviseSuTestExamAnswerSheetService',
  ['$http', '$route', '$q', '$window', reviseSuTestExamAnswerSheetService]);

function reviseSuTestExamAnswerSheetService($http, $route, $q, $window) {

   return {

     getCurrentUserAnswer : function() {

       var currentUserAnswerUrl = '/getSuTestExamAnswer/'+$window.sessionStorage.userID+'/'+
                                    $route.current.params.suTestID+'/'+
                                    $route.current.params.suTestStartAt+'/'+
                                    $route.current.params.suTestQuestionNumber;

       console.log(currentUserAnswerUrl);

       var deferred = $q.defer();

       $http({
         url: currentUserAnswerUrl,
         method: 'GET',
         headers: {
           'Authorization': 'JWT ' + $window.sessionStorage.token
           }
       }).then(function successCallback(response) {

         deferred.resolve(response.data);

       },function errorCallback(response){

       });

       return  deferred.promise;

     },
     getCurrentExamQuestion : function() {

       var currentExamQuestionUrl = '/getSuTestExamQuestion/'+$window.sessionStorage.userID+'/'+
                                      $route.current.params.suTestID+'/'+
                                      $route.current.params.suTestStartAt+'/'+
                                      $route.current.params.suTestQuestionNumber;

       var deferred = $q.defer();

       $http({
         url: currentExamQuestionUrl,
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
