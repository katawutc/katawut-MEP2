angular.module('app')
.controller('secondNavBarAdCtrl',
           ['$scope', '$window', '$rootScope',
            'chatIOService', 'chatAdminService',
             secondNavBarAdCtrl]);

function secondNavBarAdCtrl($scope, $window, $rootScope,
                            chatIOService, chatAdminService) {

  $rootScope.openNotePanel = function() {

    $rootScope.showNotePanel = !$rootScope.showNotePanel;
  }

}
