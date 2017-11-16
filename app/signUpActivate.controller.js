angular.module('app')
.controller('signUpActivateCtrl',
           ['$scope', '$http', '$routeParams', '$window', '$location',
             signUpActivateCtrl]);

function signUpActivateCtrl ($scope, $http, $routeParams, $window, $location) {

    $scope.activateEmailFocus = true;

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

          directLogIn($window, $http, $location, $scope.userID, $scope.formData.password);

      }, function errorCallback(response) {

      });
    }
  }
}

function directLogIn($window, $http, $location, uID, pass) {

  var credentials = {userID: uID,
                     password: pass};


  $http({
    method: 'POST',
    url: 'logInDirect',
    data: credentials
  }). then(function successCallback(response) {

      $window.sessionStorage.setItem('userName', response.data.userName);
      $window.sessionStorage.setItem('userID', response.data.userID);
      $window.sessionStorage.setItem('userRole', response.data.userRole);
      $window.sessionStorage.setItem('token', response.data.token);
      $window.sessionStorage.setItem('logInMessage', response.data.message);

      // Get userID here to start dashboard controller
      if ($window.sessionStorage.getItem('logInMessage') === 'login success') {

        /** route to the 1st time setting to get customised and personalized \
         *  informatiom
         */

        $location.path('/firstSetting'+'/'+
                          $window.sessionStorage.getItem('userRole')+'/'+
                          $window.sessionStorage.getItem('userID'));
      }

  }, function errorCallback(response) {

  });
}
