angular.module('app')
.factory('suSecondNavBarMessageService',
         ['$rootScope',
           suSecondNavBarMessageService]);

function suSecondNavBarMessageService($rootScope) {

   return {
     setMessage : function(message) {

       $rootScope.suSecondNavBarMessage = message;

       return $rootScope.suSecondNavBarMessage;

     }
   }
 }
