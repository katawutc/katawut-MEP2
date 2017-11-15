angular.module('app')
.controller('mainCtrl',
           ['$window',
            'socketService',
             mainCtrl]);

function mainCtrl ($window, socketService) {
  // To implement asynchronous function before pass message to view
  $window.sessionStorage.clear();

}
