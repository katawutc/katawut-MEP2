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
}
