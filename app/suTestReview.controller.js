angular.module('app').controller('suTestReviewCtrl',
                                  ['$scope', '$http', '$route',
                                    '$window', '$location',
                                      'suTestReview',
                                      suTestReviewCtrl]);

function suTestReviewCtrl($scope, $http, $route,
                          $window, $location, suTestReview) {

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
}
