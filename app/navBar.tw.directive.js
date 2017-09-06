// Navigation bar directive
angular.module('app').directive('navBarTw', navbarTw);

function navbarTw() {
  return {
    templateUrl: 'navBar.tw.html'
  };
}
