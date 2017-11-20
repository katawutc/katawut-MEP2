angular.module('app')
.factory('chatIOService',
        ['$rootScope',
          chatIOService]);

function chatIOService($rootScope) {

  //var socket = io('http://localhost:5000/');
  var chatIO = io('/chat');

  chatIO.on('connect', function() {

      $rootScope.chatSocketID = chatIO.id;

      console.log('$rootScope.chatSocketID: '+$rootScope.chatSocketID);
    })

      /*
      if ($window.sessionStorage.defaultSocketID) {

        if ($rootScope.defaultSocketID !== $window.sessionStorage.defaultSocketID) {

          /*
          console.log('page refresh ?');

          console.log($window.sessionStorage.defaultSocketID);

          console.log($rootScope.defaultSocketID);
          */
          /*

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
  */

    return {
      on: function (eventName, callback) {
        chatIO.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(chatIO, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        chatIO.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(chatIO, args);
            }
          });
        })
      }
    }
  }
