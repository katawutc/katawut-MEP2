// Log in controller
angular.module('app')
.controller('logInCtrl',
           ['$scope', '$http', '$location', '$window', '$rootScope',
            'socketService', 'chatIOService',
             logInCtrl]);

function logInCtrl ($scope, $http, $location, $window, $rootScope,
                    socketService, chatIOService) {

  /** to focus on Email input */
  $scope.inputEmailFocus = true;
  /** */

  $scope.logInSubmit = function() {

    if ($scope.credential.email && $scope.credential.password) {

    $http({
      method: 'POST',
      url: '/logIn',
      data: $scope.credential
    }).then(function successCallback(response) {

        // to work out on the asynchronous call function

        if (response.data) {
        $window.sessionStorage.setItem('userName', response.data.userName);
        $window.sessionStorage.setItem('userID', response.data.userID);
        $window.sessionStorage.setItem('userRole', response.data.userRole);
        $window.sessionStorage.setItem('token', response.data.token);
        $window.sessionStorage.setItem('logInMessage', response.data.message);
        $window.sessionStorage.setItem('activate', response.data.activate);

        // socket.io connect before routing to su dashboard
        // need to think more on this
        if (response.data.userRole === 'su') {

          var socketData = {'method': 'email',
                            'userRole': 'su',
                            'userID': $window.sessionStorage.userID,
                            'socketID': $rootScope.defaultSocketID,
                            }

          socketService.emit('suConnect', socketData);

          $window.sessionStorage.defaultSocketID = $rootScope.defaultSocketID;

          var suChatData = {'userName': $window.sessionStorage.userName,
                            'userRole': 'su',
                            'chatSocketID': $rootScope.chatSocketID}

          chatIOService.emit('suChat', suChatData);

          $window.sessionStorage.chatSocketID = $rootScope.chatSocketID;

        }
        else if (response.data.userRole === 'ad') {

          var socketData = {'method': 'email',
                            'userRole': 'ad',
                            'userID': $window.sessionStorage.userID,
                            'socketID': $rootScope.defaultSocketID}

          socketService.emit('adConnect', socketData);

          $window.sessionStorage.defaultSocketID = $rootScope.defaultSocketID;

          var adChatData = {'userName': $window.sessionStorage.userName,
                            'userRole': 'ad',
                            'chatSocketID': $rootScope.chatSocketID}

          chatIOService.emit('adChat', suChatData);

          $window.sessionStorage.chatSocketID = $rootScope.chatSocketID;

        }

        if (response.data.message === 'login success') {

          $location.path('/dashboard'+'/'+
                          $window.sessionStorage.getItem('userRole')+'/'+
                          $window.sessionStorage.getItem('userID'));
        }
        else if (response.data.message === 'login fail') {
          $location.path('/login');
        }
        else if (response.data.message === 'login fail:FB') {
          $scope.logInErrorMessage = 'You have logged in with Facebook before; please use facebook log in';
        }
      }
      else {
        $scope.logInErrorMessage = 'Wrong Email address or password';
      }

      }, function errorCallback(response) {
          $location.path('/logIn');
        });
    }
  }
};
