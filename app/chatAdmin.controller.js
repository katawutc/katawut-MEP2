angular.module('app')
.controller('chatAdminCtrl',
           ['$scope', '$http', '$routeParams',
            '$window', '$location', '$rootScope',
            'chatUserList', 'chatAdminService', 'chatIOService',
            'adSecondNavBarMessageService',
             chatAdminCtrl]);

function chatAdminCtrl($scope, $http, $routeParams,
                       $window, $location, $rootScope,
                       chatUserList, chatAdminService,
                       chatIOService,
                       adSecondNavBarMessageService) {

     /** set suSecondNavBarMessage */
     var message = 'Chat to the user: ';
     adSecondNavBarMessageService.setMessage(message);
     /** */

    /** get user list data*/
    if (chatUserList && chatUserList.errorMessage) {

      $window.sessionStorage.setItem('errorMessage', chatUserList.errorMessage);
      $location.path('/errorPage');
    }
    else if (chatUserList && !chatUserList.errorMessage){

      $scope.userList = chatUserList;
    }
    else {
      $window.sessionStorage.setItem('errorMessage', 'No Authorization');
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }

    /** implement admin select user to chat to */

    $scope.adminChatTo = function(userName, userID) {

      /** set suSecondNavBarMessage */
      var message = 'Chat to the user: '+ userName + '; ID: '+ userID;
      adSecondNavBarMessageService.setMessage(message);
      /** */

      console.log('open the admin chat panel');
      $rootScope.showAdChatPanel = true;

      console.log('admin selects '+ userID);

      chatAdminService.selectUserToChat(userID);
      console.log(chatAdminService.getUserToChat());

    }

    console.log('before chatIOService.on');
    console.log(chatAdminService.getUserToChat());

    chatIOService.on(chatAdminService.getUserToChat(), function(message) {

      console.log(message);
      $scope.sentMessage.push(message);
    })

}
