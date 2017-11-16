angular.module('app')
.controller('mainCtrl',
           ['$window', '$rootScope',
            'socketService',
             mainCtrl]);

function mainCtrl ($window, $rootScope,
                   socketService) {
  // To implement asynchronous function before pass message to view
  $window.sessionStorage.clear();

}
