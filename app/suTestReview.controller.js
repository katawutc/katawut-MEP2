angular.module('app')
.controller('suTestReviewCtrl',
           ['$scope', '$route',
            '$window', '$location',
            'suTestReview', 'suSecondNavBarMessageService',
             suTestReviewCtrl]);

function suTestReviewCtrl($scope, $route,
                          $window, $location, suTestReview,
                           suSecondNavBarMessageService) {

   /** set suSecondNavBarMessage */
   var message = $window.sessionStorage.suTestID +
                 ' Test review';
   suSecondNavBarMessageService.setMessage(message);
   /** */


   $scope.commentTextArea = false;

   $scope.suTestID = $route.current.params.suTestID;

   $scope.suTestReview = suTestReview;

   $scope.suTestSummary = function() {

     var suTestSummary = '/suTestSummary/'+
                           $window.sessionStorage.userID+'/'+
                           $window.sessionStorage.suTestID+'/'+
                           $window.sessionStorage.suTestMode+'/'+
                           $window.sessionStorage.suTestStartAt;

     $location.path(suTestSummary);
  }

  $scope.showCommentTextArea = function() {

    $scope.commentTextArea = !$scope.commentTextArea;
  }

  $scope.sendComment = function() {

    console.log('comment is sent');

    $scope.commentTextArea = !$scope.commentTextArea;

  }

}
