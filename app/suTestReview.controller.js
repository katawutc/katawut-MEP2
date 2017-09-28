angular.module('app').controller('suTestReviewCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                      'suTestReview',
                                      suTestReviewCtrl]);

function suTestReviewCtrl($scope, $http, $routeParams,
                          $window, $location, suTestReview) {

  $scope.suTestID = $window.sessionStorage.suTestID;

  console.log(suTestReview);
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
