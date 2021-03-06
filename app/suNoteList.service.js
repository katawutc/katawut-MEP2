angular.module('app')
.factory('suNoteListService',
        ['$http', '$route', '$q', '$window',
          suNoteListService]);

function suNoteListService($http, $route, $q, $window) {

   return {

     getSuNoteList : function() {

       var getSuNoteListUrl = '/getSuNoteList/'+$window.sessionStorage.userID

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: getSuNoteListUrl,
         headers: {
           'Authorization': 'JWT ' + $window.sessionStorage.token
           }
       }).then(function successCallback(response) {

         deferred.resolve(response.data);

       },function errorCallback(response){

       });
       return  deferred.promise;
     },

     deleteSuNote : function(userID, title, noteTimeStart, noteTime) {

       var deleteSuNoteUrl = '/deleteSuNote/'+userID+'/'+
                              encodeURIComponent(title)+'/'+
                              noteTimeStart+'/'+
                              noteTime;

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: deleteSuNoteUrl,
         headers: {
           'Authorization': 'JWT ' + $window.sessionStorage.token
           }
       }).then(function successCallback(response) {

         deferred.resolve(response.data);

         if(response.data === 'delete success') {

           $route.reload('/noteList/su/'+$window.sessionStorage.userID);
         }

       },function errorCallback(response){

       });
       return  deferred.promise;

     }
   }
 }
