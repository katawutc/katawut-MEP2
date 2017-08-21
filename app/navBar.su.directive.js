// Navigation bar directive
angular.module('app').directive('navBarSu', navbarSu);

function navbarSu() {
  return {
    templateUrl: 'navBar.su.html'
  };
}
