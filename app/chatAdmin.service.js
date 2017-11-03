angular.module('app')
.factory('chatAdminService',
        ['$http', '$route', '$q', '$window',
          chatAdminService]);

function chatAdminService($http, $route, $q, $window) {

      var selectedUserID;

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

         console.log('at adminSelectChatService: selectUserToChat');

         selectedUserID = id;
     },

       getUserToChat : function() {

         console.log('at adminSelectChatService: getUserToChat');

         return selectedUserID;
     }

   }
 }
