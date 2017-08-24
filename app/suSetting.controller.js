angular.module('app').controller('suSettingCtrl',
                                  suSettingCtrl);

function suSettingCtrl ($scope, $http, $routeParams, $window, $location,
                          suSettingData) {

  /**
   * go to the DB to fetch the current user setting to display on the view \
   * by service
   */

   if(suSettingData === null) {$location.path('/errorPage');}

   $scope.userID = suSettingData.userID;
   $scope.userRole = suSettingData.userRole;

  $scope.saveSetting = function() {

  }

}
