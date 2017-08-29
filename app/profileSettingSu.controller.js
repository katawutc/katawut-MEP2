angular.module('app').controller('profileSettingSuCtrl',
                                  profileSettingSuCtrl);

function profileSettingSuCtrl ($scope, $http, $routeParams, $window, $location,
                                profileSettingSuData) {

  /**
   * go to the DB to fetch the current user setting to display on the view \
   * by service
   */

   if(profileSettingSuData === null) {$location.path('/errorPage');}

   $scope.userID = profileSettingSuData.userID;
   $scope.userRole = profileSettingSuData.userRole;

  $scope.saveSetting = function() {

  }

}
