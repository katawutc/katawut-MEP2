angular.module('app')
.factory('chatIOService',
        ['$rootScope', '$window',
          chatIOService]);

function chatIOService($rootScope, $window) {

  //var socket = io('http://localhost:5000/');
  var chatIO = io('/chat');

  chatIO.on('connect', function() {

      $rootScope.chatSocketID = chatIO.id;

      console.log('$rootScope.chatSocketID: '+$rootScope.chatSocketID);

      if ($window.sessionStorage.chatSocketID) {

        if ($rootScope.chatSocketID !== $window.sessionStorage.chatSocketID) {

          console.log('page refresh ?');

          console.log($window.sessionStorage.chatSocketID);

          console.log($rootScope.chatSocketID);

        var chatSocketData = {'previousChatSocket': $window.sessionStorage.chatSocketID,
                              'newChatSocket': $rootScope.chatSocketID,
                              'refreshAt': Date.now(),
                              'userID': $window.sessionStorage.userID,
                              'userName': $window.sessionStorage.userName,
                              'userRole': $window.sessionStorage.userRole}

        chatIO.emit('refreshChatSocket', chatSocketData);

        $window.sessionStorage.chatSocketID = $rootScope.chatSocketID;

      }
    }

  })

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
      },
      socketID: function() {
        return chatIO.id;
      }
    }
  }
