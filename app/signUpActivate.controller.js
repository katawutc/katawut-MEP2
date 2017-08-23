angular.module('app').controller('signUpActivateCtrl',
                                  signUpActivateCtrl);

function signUpActivateCtrl ($scope, $http, $routeParams, $window, $location) {

    $scope.userID = $routeParams.userID;
    $scope.hashActivate = $routeParams.hashActivate;

    $scope.signUpActivate = function() {

      if ($scope.formData.password !== $scope.formData.password2) {
        $scope.passwordError = 'Password and confirmed password do not match.';
      }
      else {
      activateAccountUrl = 'activateAccount/'+$scope.userID+'/'+$scope.hashActivate;

      $http({
        method: 'POST',
        url: activateAccountUrl,
        data: $scope.formData
      }). then(function successCallback(response) {
          console.log(response.data);
      }, function errorCallback(response) {
          console.log(response.data);
      });
    }

  }
}
