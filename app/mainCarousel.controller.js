angular.module('app').controller('mainCarouselCtrl',
                                  mainCarouselCtrl);

function mainCarouselCtrl ($scope) {

    $scope.myInterval = 1000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    slides.push({
      image: 'image/mep02.jpg',
         id: currIndex++
});

  }
