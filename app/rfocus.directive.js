angular.module('app')
.directive('rfocus', function() {
    return {
      restrict: 'A',
      controller: function($scope, $element, $attrs){
            var fooName = 'setFocus' + $attrs.rfocus;
            $scope[fooName] = function(){
              $element[0].focus();
            }
        },
    }
});
