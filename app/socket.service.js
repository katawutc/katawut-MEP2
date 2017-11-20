angular.module('app').factory('socketService',
                             ['$rootScope', '$window',
                               socketService]);

function socketService($rootScope, $window) {

  //var socket = io('http://localhost:5000/');
  var socket = io();
  //var socket = io({transports: ['websocket'], upgrade: false});

  socket.on('connect', function() {

      $rootScope.defaultSocketID = socket.id;

      //console.log('$rootScope.defaultSocketID: '+$rootScope.defaultSocketID);

      if ($window.sessionStorage.defaultSocketID) {

        if ($rootScope.defaultSocketID !== $window.sessionStorage.defaultSocketID) {

          /*
          console.log('page refresh ?');

          console.log($window.sessionStorage.defaultSocketID);

          console.log($rootScope.defaultSocketID);
          */

        var socketData = {'previousSocket': $window.sessionStorage.defaultSocketID,
                          'newSocket': $rootScope.defaultSocketID,
                          'refreshAt': Date.now(),
                          'userID': $window.sessionStorage.userID,
                          'userRole': $window.sessionStorage.userRole}

        socket.emit('refreshSocket', socketData);

        $window.sessionStorage.defaultSocketID = $rootScope.defaultSocketID;

      }
    }

  })

    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    }
  }
