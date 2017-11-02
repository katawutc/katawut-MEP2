angular.module('app')
.controller('profileSettingSuCtrl',
           ['$scope', '$location',
            'profileSettingSuData',
             profileSettingSuCtrl]);

function profileSettingSuCtrl ($scope, $location,
                                profileSettingSuData) {

    $scope.userID = $window.sessionStorage.userID;

    if(profileSettingSuData === null) {$location.path('/errorPage');}

    $scope.userName = profileSettingSuData.userName;


    $scope.saveSetting = function() {

  }

}
