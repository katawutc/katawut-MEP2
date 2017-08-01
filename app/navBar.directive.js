// Navigation bar directive
angular.module('app').directive('navBar', navbar);

function navbar() {
  return {
    templateUrl: 'navBar.html'
  };
}
