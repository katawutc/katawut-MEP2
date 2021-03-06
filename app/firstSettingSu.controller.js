angular.module('app')
.controller('firstSettingSuCtrl',
           ['$scope', '$http', '$window',
            '$location',
            'socketService',
             firstSettingSuCtrl]);

function firstSettingSuCtrl ($scope, $http, $window,
                             $location,
                             socketService) {

  // use DB to fetch this in the future
  $scope.levelList = ['P6', 'M3', 'M6', 'others 1'];

  // GAT, PAT, etc
  $scope.testList = ['O-net', 'others 1', 'others 2', 'others 3'];

  $scope.subjectList = ['Math', 'English', 'Science', 'others 1'];

  $scope.saveSetting = function(){

    $scope.settingData = {'userLevel': $scope.selectedLevel,
                          'userPreferTest': $scope.selectedTest,
                          'userPreferSubject': $scope.selectedSubject}

    var firstSettingUrl = 'firstSetting/'+$window.sessionStorage.userRole+'/'+
                          $window.sessionStorage.userID

    // save the first setting parameter into the DB
    $http({
      method: 'POST',
      url: firstSettingUrl,
      data: $scope.settingData,
      headers: {
        'Authorization': 'JWT ' + $window.sessionStorage.token
        }
    }).then(function successCallback(response) {
      // route to the dashboard

      $window.sessionStorage.activate = 'true';

      $location.path('/dashboard/'+$window.sessionStorage.userRole+'/'+
                      $window.sessionStorage.userID);
    },function errorCallback(response){

    });

  }

}
