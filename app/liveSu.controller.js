angular.module('app')
.controller('liveSuCtrl',
           ['$scope', '$http', '$routeParams',
            '$window', '$location', '$rootScope',
            'liveSu', 'chatIOService',
            'adSecondNavBarMessageService',
             liveSuCtrl]);

function liveSuCtrl($scope, $http, $routeParams,
                    $window, $location, $rootScope,
                    liveSu,
                    chatIOService,
                       adSecondNavBarMessageService) {

     /** set suSecondNavBarMessage */
     var message = 'LIVE users';
     adSecondNavBarMessageService.setMessage(message);
     /** */

    /** get user list data*/
    if (liveSu) {

      console.log(liveSu);

      $scope.liveSu = liveSu;
    }
    else {
      $window.sessionStorage.setItem('errorMessage', 'No Authorization');
      $window.sessionStorage.setItem('logInMessage', 'login fail');
      $location.path('/errorPage');
    }

}
