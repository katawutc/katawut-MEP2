angular.module('app')
.controller('adminToReplyCtrl',
           ['$scope', '$window', '$http', '$rootScope',
            'toReplyList', 'adSecondNavBarMessageService',
            'chatIOService',
             adminToReplyCtrl]);

function adminToReplyCtrl($scope, $window, $http, $rootScope,
                          toReplyList, adSecondNavBarMessageService,
                          chatIOService) {

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

          // open the admin chat dialog
          $rootScope.showAdChatPanel = true;

          var message = response.data[0].message;

          // populate the message
          // $scope.adSentMessage.push('You: '+$scope.message);

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
          }

        },function errorCallback(response){

        });

  }
}
