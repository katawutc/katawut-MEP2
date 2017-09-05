angular.module('app').controller('modalInstanceCtrl', modalInstanceCtrl);

function modalInstanceCtrl ($scope, $uibModalInstance) {
  var $ctrl = this;

$ctrl.ok = function () {
  $uibModalInstance.close('ok');
};

$ctrl.cancel = function () {
  $uibModalInstance.dismiss('cancel');
};
}
