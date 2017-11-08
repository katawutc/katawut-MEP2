angular.module('app')
.controller('suTestReviewCtrl',
           ['$scope', '$route',
            '$window', '$location', '$http', '$q',
            'suTestReview', 'suSecondNavBarMessageService',
             suTestReviewCtrl]);

function suTestReviewCtrl($scope, $route,
                          $window, $location, $http, $q,
                          suTestReview,
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

    /**
      * to implement if comment is empty, not to send anything
      */

    $scope.commentTextArea = !$scope.commentTextArea;

    var comment = {
                    'userID': window.sessionStorage.userID,
                    'testID': suTestReview.solutionID,
                    'questionNumber': suTestReview.solQuestionNumber,
                    'commentTime': Date.now(),
                    'comment': $scope.suTestComment
                  }


    var postSuTestCommentUrl = '/postSuTestComment/'+$window.sessionStorage.userID;

    var deferred = $q.defer();

    $http({
      method: 'POST',
      url: postSuTestCommentUrl,
      data: comment,
      headers: {
        'Authorization': 'JWT ' + $window.sessionStorage.token
        }
    }).then(function successCallback(response) {
      deferred.resolve(response.data);

      $scope.suTestComment = '';

    },function errorCallback(response){

    });
    return  deferred.promise;

  }
}
