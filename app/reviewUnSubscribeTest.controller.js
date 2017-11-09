angular.module('app')
.controller('reviewUnSubscribeTestCtrl',
           ['$scope', '$location', '$http', '$q',
            'reviewUnSubscribeTest',
             reviewUnSubscribeTestCtrl])

function reviewUnSubscribeTestCtrl($scope, $location, $http, $q,
                                   reviewUnSubscribeTest) {

  console.log(reviewUnSubscribeTest);

  $scope.questionNumber = reviewUnSubscribeTest.solQuestionNumber;
  $scope.question = reviewUnSubscribeTest.question;
  $scope.solution = reviewUnSubscribeTest.solution;
  $scope.explanation = reviewUnSubscribeTest.explanation;

  $scope.routeToTestSummaryUnSubscribeUser = function() {
    $location.path('/testSummaryUnSubscribeUser');
  }


  $scope.commentTextArea = false;

  $scope.showCommentTextArea = function() {

    $scope.commentTextArea = !$scope.commentTextArea;
  }

  $scope.sendComment = function() {

    /**
      * to implement if comment is empty, not to send anything
      */

    var comment = {
                    'testID': reviewUnSubscribeTest.solutionID,
                    'questionNumber': reviewUnSubscribeTest.solQuestionNumber,
                    'commentTime': Date.now(),
                    'comment': $scope.testComment
                  }


    var postTestCommentUrl = '/postTestComment';

    var deferred = $q.defer();

    if (comment.comment) { // if comment is not empty

      $scope.commentTextArea = !$scope.commentTextArea;

      $http({
        method: 'POST',
        url: postTestCommentUrl,
        data: comment
      }).then(function successCallback(response) {

        deferred.resolve(response.data);

        $scope.testComment = '';

      },function errorCallback(response){

      });
      return  deferred.promise;

    }
    else if (!comment.comment) // if comment is empty
    {
      $scope.commentTextArea = !$scope.commentTextArea;
    }
  }

}
