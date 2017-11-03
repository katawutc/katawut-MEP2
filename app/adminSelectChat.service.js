angular.module('app')
.factory('adminSelectChatService',
         [adminSelectChatService]);

function adminSelectChatService() {

    var selectedUserID;

    return {

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
