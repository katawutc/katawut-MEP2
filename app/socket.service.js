angular.module('app').factory('socketService',
                             ['$rootScope',
                               socketService]);

function socketService($rootScope) {

  //var socket = io('http://localhost:5000/');
  var socket = io();

  socket.on('connect', function() {

    $rootScope.defaultSocketID = socket.id;
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
