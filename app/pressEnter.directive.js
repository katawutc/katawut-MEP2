angular.module('app').directive('pressEnter', function() {
    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {

        $element.bind("keydown keypress", function ($event) {
            if($event.which === 13) {
                $scope.$apply(function (){
                    $scope.$eval($attr.pressEnter);
                });

                $event.preventDefault();
        }
      })
    }
  }
})
