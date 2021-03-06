angular.module('app')
.controller('fbLogInCtrl',
           ['$http', '$routeParams', '$window', '$rootScope',
            '$location',
            'socketService', 'chatIOService',
             fbLogInCtrl]);

function fbLogInCtrl ($http, $routeParams, $window, $rootScope,
                      $location,
                      socketService, chatIOService) {

    var fbID = {fbID: $routeParams.fbID};

    $http({
      url: 'fbLogIn',
      method: 'POST',
      data: fbID
    }).then(function successCallback(response) {

      if (response.data) {
      $window.sessionStorage.setItem('userName', response.data.userName);
      $window.sessionStorage.setItem('userID', response.data.userID);
      $window.sessionStorage.setItem('userRole', response.data.userRole);
      $window.sessionStorage.setItem('token', response.data.token);
      $window.sessionStorage.setItem('logInMessage', response.data.message);
      $window.sessionStorage.setItem('activate', response.data.activate);

      /*** need to do async here ***/

      // Get userID here to start dashboard controller
      if ($window.sessionStorage.logInMessage === 'login success' &&
            $window.sessionStorage.activate === 'false') {

              $location.path('/firstSetting'+'/'+
                                $window.sessionStorage.getItem('userRole')+'/'+
                                $window.sessionStorage.getItem('userID'));
        }
      else if ($window.sessionStorage.logInMessage === 'login success' &&
            $window.sessionStorage.activate === 'true') {

        var socketData = {'method': 'fb',
                          'userRole': 'su',
                          'userID': $window.sessionStorage.userID,
                          'socketID': $rootScope.defaultSocketID}

        socketService.emit('suConnect', socketData);

        $window.sessionStorage.defaultSocketID = $rootScope.defaultSocketID;

        var suChatData = {'userID': $window.sessionStorage.userID,
                          'userName': $window.sessionStorage.userName,
                          'userRole': 'su',
                          'chatSocketID': $rootScope.chatSocketID}

        chatIOService.emit('chatConnect', suChatData);

        $window.sessionStorage.chatSocketID = $rootScope.chatSocketID;

        $location.path('/dashboard'+'/'+
                        $window.sessionStorage.getItem('userRole')+'/'+
                        $window.sessionStorage.getItem('userID'));
      }
      else if ($window.sessionStorage.getItem('logInMessage') === 'login fail') {
        $location.path('/login');
      }
      }
    },function errorCallback(response){

    });
  }
