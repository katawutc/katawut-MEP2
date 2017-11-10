angular.module('app')
.factory('adSecondNavBarMessageService',
         ['$rootScope',
           adSecondNavBarMessageService]);

function adSecondNavBarMessageService($rootScope) {

   return {

     setMessage : function(message) {

       $rootScope.adSecondNavBarMessage = message;

       return $rootScope.adSecondNavBarMessage;

     }
   }
 }
