angular.module('app').controller('profileSettingSuCtrl',
  ['$scope', '$http', '$routeParams', '$window', '$location',
    'profileSettingSuData', profileSettingSuCtrl]);

function profileSettingSuCtrl ($scope, $http, $routeParams, $window, $location,
                                profileSettingSuData) {

    $scope.userID = $window.sessionStorage.userID;

    if(profileSettingSuData === null) {$location.path('/errorPage');}

    $scope.userName = profileSettingSuData.userName;


    $scope.saveSetting = function() {

  }

}
