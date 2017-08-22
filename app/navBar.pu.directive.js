// Navigation bar directive
angular.module('app').directive('navBarPu', navbarPu);

function navbarPu() {
  return {
    templateUrl: 'navBar.pu.html'
  };
}
