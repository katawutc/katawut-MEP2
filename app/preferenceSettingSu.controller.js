angular.module('app').controller('preferenceSettingSuCtrl',
                                  preferenceSettingSuCtrl);

function preferenceSettingSuCtrl ($scope, $http, $routeParams, $window, $location, preferenceSettingSuData) {

    $scope.userID = preferenceSettingSuData.userID;

    /**
     * go to the DB to fetch the current user setting to display on the view \
     * by service
     */

     if(preferenceSettingSuData === null) {$location.path('/errorPage');}

     $scope.userLevel = preferenceSettingSuData.userLevel;
     $scope.userPreferTest = preferenceSettingSuData.userPreferTest;
     $scope.userPreferSubject = preferenceSettingSuData.userPreferSubject;

     $scope.edit = function() {
       console.log('to show modal dialog for setting');




     }

}
