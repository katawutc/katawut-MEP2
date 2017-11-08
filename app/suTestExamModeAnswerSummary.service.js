angular.module('app')
.factory('suTestExamModeAnswerSummaryService',
        ['$http', '$q', '$window',
          suTestExamModeAnswerSummaryService]);

function suTestExamModeAnswerSummaryService($http, $q, $window) {

   return {

     getAnswerSummary : function() {

       var suTestExamModeAnswerSummaryUrl = '/suTestExamModeAnswerSummary/'+$window.sessionStorage.userID+'/'+
                                              $window.sessionStorage.suTestID+'/'+
                                              $window.sessionStorage.suTestStartAt;

       var deferred = $q.defer();

       $http({
        method: 'GET',
        url: suTestExamModeAnswerSummaryUrl,
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
