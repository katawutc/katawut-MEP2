angular.module('app')
.controller('secondNavBarAdCtrl',
           ['$scope', '$window', '$rootScope',
             secondNavBarAdCtrl]);

function secondNavBarAdCtrl($scope, $window, $rootScope) {

  $rootScope.openNotePanel = function() {

    $rootScope.showNotePanel = !$rootScope.showNotePanel;
  }

}
