angular.module('app')
.controller('adminToReplyCtrl',
           ['$scope',
            'toReplyList', 'adSecondNavBarMessageService',
             adminToReplyCtrl]);

function adminToReplyCtrl($scope,
                          toReplyList, adSecondNavBarMessageService) {

  /** set suSecondNavBarMessage */
  var message = 'Message here need to be replied';
  adSecondNavBarMessageService.setMessage(message);
  /** */

  console.log(toReplyList);

  $scope.toReplyList = toReplyList;

  $scope.adminReply = function(userID, chatStartAt) {

    console.log('adminReply to '+userID);
    console.log('chatStartAt '+chatStartAt);

    /**
      * 1. to use adminToReplyService to retrieve false sentSuccess messages
      * 2. open chat dialog to reply
      * 3. set message as true sentSuccess
      */
  }
}
