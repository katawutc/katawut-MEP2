angular.module('app').controller('modalInstanceCtrl', modalInstanceCtrl);

function modalInstanceCtrl ($scope, $uibModal) {
  var $ctrl = this;

$ctrl.ok = function () {
};

$ctrl.cancel = function () {
  $uibModal.dismiss('cancel');
};
}
