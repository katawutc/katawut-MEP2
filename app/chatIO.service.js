angular.module('app')
.factory('chatIOService',
        ['$rootScope',
          chatIOService]);

function chatIOService($rootScope) {

  //var socket = io('http://localhost:5000/');
  var chatIO = io('/chat');

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
