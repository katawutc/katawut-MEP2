angular.module('app').controller('preferenceSettingSuModalCtrl',
  ['$scope', '$uibModalInstance', '$window',
    '$http', '$location', 'params', preferenceSettingSuModalCtrl]);

function preferenceSettingSuModalCtrl ($scope, $uibModalInstance, $window,
                                        $http, $location, params) {
  var $ctrl = this;

  // use DB to fetch this in the future
  $scope.levelList = ['P6', 'M3', 'M6', 'others 1'];

  $scope.testList = ['O-net', 'others 1', 'others 2', 'others 3'];

  $scope.subjectList = ['Math', 'English', 'Science', 'others 1'];

  $scope.data = params;

  $ctrl.ok = function () {

  $scope.newSettingData = {userLevel: $scope.selectedLevel,
                            userPreferTest: $scope.selectedTest,
                            userPreferSubject: $scope.selectedSubject}

  /** save new setting into the DB */

  var saveSettingUrl = 'saveSetting/'+$window.sessionStorage.userRole+'/'+
                        $window.sessionStorage.userID

  // save the first setting parameter into the DB
  $http({
    method: 'POST',
    url: saveSettingUrl,
    data: $scope.newSettingData,
    headers: {
      'Authorization': 'JWT ' + $window.sessionStorage.token
      }
  }).then(function successCallback(response) {
    /**
     * use data service to pass new setting to the \
     * preference page
     */

  },function errorCallback(response){
    // what to do if fail to save into the DB?

    /**
     * show modal saying fail to save new data
     * reverse display setting to the original
     *
     * params ?
     */

     // if fail reload the existing preference setting
     $location.path('/preferenceSetting/su/'+$window.sessionStorage.userID);

  });

  // pass new setting back to parent
  $uibModalInstance.close($scope.newSettingData);

};

$ctrl.cancel = function () {
  $uibModalInstance.dismiss('cancel');
};
}
