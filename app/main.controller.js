angular.module('app').controller('mainCtrl', mainCtrl);

function mainCtrl($window) {
  // To implement asynchronous function before pass message to view
  $window.sessionStorage.clear();
}
