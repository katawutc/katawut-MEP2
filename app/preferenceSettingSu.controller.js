angular.module('app').controller('preferenceSettingSuCtrl',
                                  preferenceSettingSuCtrl);

function preferenceSettingSuCtrl ($scope, $http, $routeParams, $window, $location,
                                  $uibModal, $document, $log, preferenceSettingSuData) {

    $scope.userID = preferenceSettingSuData.userID;

    /**
     * go to the DB to fetch the current user setting to display on the view \
     * by service
     */

     if(preferenceSettingSuData === null) {$location.path('/errorPage');}

     $scope.userLevel = preferenceSettingSuData.userLevel;
     $scope.userPreferTest = preferenceSettingSuData.userPreferTest;
     $scope.userPreferSubject = preferenceSettingSuData.userPreferSubject;


     /** */



      $scope.open = function (size, parentSelector) {

        var $ctrl = this;
        $ctrl.items = ['item1', 'item2', 'item3'];

        //var parentElem = parentSelector ?
          //angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'preferenceSettingSuModal.html',
          controller: 'modalInstanceCtrl',
          controllerAs: '$ctrl',
          size: size,
          //appendTo: parentElem,
          resolve: {
                        items: function () {
              return $ctrl.items;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
       $ctrl.selected = selectedItem;
     }, function () {
       $log.info('Modal dismissed at: ' + new Date());
     });
   }
 }
