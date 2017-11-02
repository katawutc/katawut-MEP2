angular.module('app')
.controller('preferenceSettingSuCtrl',
           ['$scope',
            '$uibModal', '$document',
            'preferenceSettingSuData',
             preferenceSettingSuCtrl]);

function preferenceSettingSuCtrl ($scope, $uibModal, $document, preferenceSettingSuData) {

    $scope.userID = preferenceSettingSuData.userID;

    /**
     * go to the DB to fetch the current user setting to display on the view \
     * by service
     */

     if(preferenceSettingSuData === null) {$location.path('/errorPage');}

     $scope.userLevel = preferenceSettingSuData.userLevel;
     $scope.userPreferTest = preferenceSettingSuData.userPreferTest;
     $scope.userPreferSubject = preferenceSettingSuData.userPreferSubject;

     $scope.currentSetting = function() {
                                return {
                                currentUserLevel: $scope.userLevel,
                                currentPrefertest: $scope.userPreferTest,
                                currentPreferSubject: $scope.userPreferSubject
                                }
                              }

     /** */

      $scope.editPreference = function (size, parentSelector) {

        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'preferenceSettingSuModal.html',
          controller: 'preferenceSettingSuModalCtrl',
          controllerAs: '$ctrl',
          size: size,
          resolve: {
            params: function () {
                return $scope.currentSetting();
            }
        }
      });

        modalInstance.result.then(function (result) {

          $scope.userLevel = result.userLevel;
          $scope.userPreferTest = result.userPreferTest;
          $scope.userPreferSubject = result.userPreferSubject;

     }, function () {

     });
   }
 }
