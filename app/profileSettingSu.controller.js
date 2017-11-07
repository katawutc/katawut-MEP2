angular.module('app')
.controller('profileSettingSuCtrl',
           ['$scope', '$location', '$window',
            'profileSettingSuData',
             profileSettingSuCtrl]);

function profileSettingSuCtrl ($scope, $location, $window,
                                profileSettingSuData) {

    $scope.userID = $window.sessionStorage.userID;

    if(profileSettingSuData === null) {$location.path('/errorPage');}

    $scope.userName = profileSettingSuData.userName;


    $scope.saveSetting = function() {

  }

}
