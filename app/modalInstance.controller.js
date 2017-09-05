angular.module('app').controller('modalInstanceCtrl', modalInstanceCtrl);

function modalInstanceCtrl ($scope, $uibModalInstance, params) {
  var $ctrl = this;

  // use DB to fetch this in the future
  $scope.levelList = ['P6', 'M3', 'M6', 'others 1'];

  $scope.testList = ['O-net', 'others 1', 'others 2', 'others 3'];

  $scope.subjectList = ['Math', 'English', 'Science', 'others 1'];

  console.log(params);

  $scope.data = params;

$ctrl.ok = function () {
  $uibModalInstance.close('ok');
};

$ctrl.cancel = function () {
  $uibModalInstance.dismiss('cancel');
};
}
