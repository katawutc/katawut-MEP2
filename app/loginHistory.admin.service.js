angular.module('app')
.factory('loginHistoryAdminService',
        ['$http', '$route', '$q', '$window',
          loginHistoryAdminService]);

function loginHistoryAdminService($http, $route, $q, $window) {

   return {
     getLoginHistoryAdmin : function() {

       var loginHistoryUrl = '/admin/loginHistory/'+$route.current.params.userRole+
                             '/'+$route.current.params.userID;

       var deferred = $q.defer();

       $http({
         method: 'GET',
         url: loginHistoryUrl,
         headers: {
           'Authorization': 'JWT ' + $window.sessionStorage.token
           }
       }).then(function successCallback(response) {
         deferred.resolve(response.data);
       },function errorCallback(response){

       });
       return  deferred.promise;
     },
     getLoginHistoryCountAdmin : function() {

       console.log('getLoginHistoryCount');

       var loginHistoryCountUrl = '/admin/loginHistoryCount/'+$route.current.params.userRole+
                                  '/'+$route.current.params.userID;

       var deferred = $q.defer();

       $http({
          method: 'GET',
          url: loginHistoryCountUrl,
          headers: {
            'Authorization': 'JWT ' + $window.sessionStorage.token
            }
        }).then(function successCallback(response) {
          deferred.resolve(response.data);
        },function errorCallback(response){

        });
        return  deferred.promise;
     },
     getPageData : function(lastIDCurrentpage, previousPage, newPage) {

       console.log('at getPageData');

       console.log(lastIDCurrentpage);

       console.log('previous page: '+ previousPage);

       console.log('new page: '+ newPage);

       var previousPage = parseInt(previousPage);
       var newPage = parseInt(newPage);

       console.log(typeof(previousPage));
       console.log(typeof(newPage));

       console.log(previousPage);
       console.log(newPage);

       /**
         * 1. if page change is next to the previous one
         * 1a. if page is greater than the previous one
         * 1b. if page is lesser than the previous one
         * 2. if page change is not next to the previous one
         */

         var loginHistoryPageUrl = '/admin/loginHistoryPage/'+$route.current.params.userRole+'/'+
                                     $route.current.params.userID+'/'+
                                     lastIDCurrentpage;

         var deferred = $q.defer();

         $http({
           method: 'GET',
           url: loginHistoryPageUrl,
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
