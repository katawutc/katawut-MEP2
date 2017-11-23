angular.module('app')
.factory('chatAdminService',
        ['$http', '$route', '$q', '$window', '$rootScope',
          chatAdminService]);

function chatAdminService($http, $route, $q, $window, $rootScope) {

    $rootScope.adChatStartAt = {};

     return {
       getChatUser : function() {

         var chatUserListUrl = '/adminChat/'+
                                $route.current.params.userID+
                                '/userList';

         var deferred = $q.defer();

         /** get all the user list for the starter */
         $http({
           url: chatUserListUrl,
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

       selectUserToChat : function(id) {

         $rootScope.selectedSuID = id;

         // to keep tract of chat start at from ad min 1st to chat
         $rootScope.adChatStartAt[id] = Date.now();

         console.log($rootScope.adChatStartAt);

         console.log($rootScope.adChatStartAt[id]);
     },

       getSuToChat : function() {

         return $rootScope.selectedSuID;
     }

   }
 }
