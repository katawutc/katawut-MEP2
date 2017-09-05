angular.module('app').controller('modalInstanceCtrl', modalInstanceCtrl);

function modalInstanceCtrl ($scope, $uibModalInstance, params) {
  var $ctrl = this;

  console.log(params);

  $scope.data = params;

$ctrl.ok = function () {
  $uibModalInstance.close('ok');
};

$ctrl.cancel = function () {
  $uibModalInstance.dismiss('cancel');
};
}
