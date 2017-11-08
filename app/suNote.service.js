angular.module('app')
.factory('suNoteService',
        ['$http', '$route', '$q', '$window',
          suNoteService]);

function suNoteService($http, $route, $q, $window) {

   return {

     getSuNote : function() {

       var getSuNoteUrl = '/getSuNote/'+$window.sessionStorage.userID+'/'+
                           $route.current.params.title+'/'+
                           $route.current.params.noteTimeStart+'/'+
                           $route.current.params.noteTime;

       console.log(getSuNoteUrl);

       console.log($window.sessionStorage.userID);
       console.log($route.current.params.title);
       console.log($route.current.params.noteTimeStart);
       console.log($route.current.params.noteTime);

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: getSuNoteUrl,
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
