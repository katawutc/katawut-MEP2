angular.module('app')
.factory('suTestHistoryService',
        ['$http', '$q', '$window', '$route',
          suTestHistoryService]);

function suTestHistoryService($http, $q, $window, $route) {

   return {
     registerSuTestHistory : function() {

       if ($route.current.params.suTestQuestionNumber==='1') {

         var suTestInfo = {'testID': $window.sessionStorage.testID,
                           'suTestNumber': $window.sessionStorage.suTestNumber};

         var registerSuTestHistoryUrl = '/registerSuTestHistory/'+$window.sessionStorage.userID+'/'+
                                          $window.sessionStorage.suTestID+'/'+
                                          $window.sessionStorage.suTestMode+'/'+
                                          $window.sessionStorage.suTestStartAt;

         var deferred = $q.defer();

         $http({
           url: registerSuTestHistoryUrl,
           method: 'POST',
           data: suTestInfo,
           headers: {
             'Authorization': 'JWT ' + $window.sessionStorage.token
             }
         }).then(function successCallback(response) {

           deferred.resolve(response.data);

         },function errorCallback(response){

         });
         return  deferred.promise;
       }
       else {
          return 'registered';
      }
       },

       getSuTestHistory : function() {

         var getSuTestHistoryUrl = '/getSuTestHistory/'+$window.sessionStorage.userID;

         var deferred = $q.defer();

         $http({
           url: getSuTestHistoryUrl,
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
