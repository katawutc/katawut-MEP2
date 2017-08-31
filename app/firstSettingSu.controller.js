angular.module('app').controller('firstSettingSuCtrl',
                                  firstSettingSuCtrl);

function firstSettingSuCtrl ($scope, $http, $routeParams, $window,
                            $location) {

  // use DB to fetch this in the future
  $scope.levelList = ['P6', 'M3', 'M6', 'others 1'];

  $scope.testList = ['O-net', 'others 1', 'others 2', 'others 3'];

  $scope.subjectList = ['Math', 'English', 'Science', 'others 1'];

  $scope.settingData = {userLevel: $scope.selectedLevel,
                        userPreferTest: $scope.selectedTest,
                        userPreferSubject: $scope.selectedSubject}

  $scope.saveSetting = function(){

    $scope.settingData = {userLevel: $scope.selectedLevel,
                          userPreferTest: $scope.selectedTest,
                          userPreferSubject: $scope.selectedSubject}

    console.log($scope.settingData);

    var saveSettingUrl = 'saveSetting/'+$window.sessionStorage.userRole+'/'+
                          $window.sessionStorage.userID

    // save the first setting parameter into the DB
    $http({
      method: 'POST',
      url: saveSettingUrl,
      data: $scope.settingData
    }).then(function successCallback(response) {
      // route to the dashboard

      console.log('success return from setting parameter');
      $window.sessionStorage.activate = 'true';
      $location.path('/dashboard/'+$window.sessionStorage.userRole+'/'+
                      $window.sessionStorage.userID);
    },function errorCallback(response){

    });

  }

}
