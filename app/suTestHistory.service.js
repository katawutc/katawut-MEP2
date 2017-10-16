angular.module('app').factory('suTestHistoryService',
  ['$http', '$route', '$q', '$window', suTestHistoryService]);

function suTestHistoryService($http, $route, $q, $window) {

   return {
     registerSuTestHistory : function() {

       if ($route.current.params.suTestQuestionNumber==='1') {

         console.log('at suTestHistoryService: registerSuTestHistory');

         var suTestInfo = {'testID': $window.sessionStorage.testID,
                           'suTestNumber': $window.sessionStorage.suTestNumber};

         console.log(suTestInfo);

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

         console.log('at suTestHistoryService: getSuTestHistory');

         var getSuTestHistoryUrl = '/getSuTestHistory/'+$window.sessionStorage.userID;

         console.log(getSuTestHistoryUrl);

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
