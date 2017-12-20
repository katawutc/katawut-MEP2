angular.module('app')
.controller('adminToReplyCtrl',
           ['$scope', '$window', '$http', '$rootScope',
            'toReplyList', 'adSecondNavBarMessageService',
            'chatIOService', 'adminToReplyService',
             adminToReplyCtrl]);

function adminToReplyCtrl($scope, $window, $http, $rootScope,
                          toReplyList, adSecondNavBarMessageService,
                          chatIOService, adminToReplyService) {

  /** need to implement $scope.adSentMessage to channel for each su user */
  //$scope.adSentMessage = [];

  /** set suSecondNavBarMessage */
  var message = 'Message here need to be replied';
  adSecondNavBarMessageService.setMessage(message);
  /** */

  $scope.toReplyList = toReplyList;

  $scope.adminReply = function(userID, chatStartAt) {

    /**
      * 1. to use adminToReplyService to retrieve false sentSuccess messages
      * 2. open chat dialog to reply
      * 3. set message as true sentSuccess
      */

        var getMessageUrl = '/adminToReply/message/'+
                              $window.sessionStorage.userID+'/'+  // adID
                              userID+'/'+                         // suID
                              chatStartAt;

        $http({
          url: getMessageUrl,
          method: 'GET',
          headers: {
            'Authorization': 'JWT ' + $window.sessionStorage.token
            }
        }).then(function successCallback(response) {

          // set 2nd nav bar message
          adSecondNavBarMessageService.setMessage('Replying to: '+response.data[0].userID);

          // open the admin chat dialog
          $rootScope.showAdChatPanel = true;

          // set adminReplySuID and chatStartAt
          $rootScope.adminReplySuID = response.data[0].userID;
          $rootScope.adChatStartAt[$rootScope.adminReplySuID] = response.data[0].chatStartAt;

          var message = response.data[0].message;

          // populate the message
          for (var i = 0; i<message.length; i++) {

            if (message[i].userRole === 'su') {

              $rootScope.adSentMessage.push('su: '+message[i].message);

              // to update the sentSuccess status
              message[i].sentSuccess = true;
              chatIOService.emit('suMessageReceive', message[i]);
            }
            else if (message[i].userRole === 'ad') {

              $rootScope.adSentMessage.push('You: '+message[i].message);

              // to update the sentSuccess status
              message[i].sentSuccess = true;
              chatIOService.emit('adMessageReceive', message[i]);
            }

            // to update the adminToReply list


          }

        },function errorCallback(response){

        });

  }
}
