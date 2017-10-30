angular.module('app')
.controller('mainCarouselCtrl',
           ['$scope', mainCarouselCtrl]);

function mainCarouselCtrl ($scope) {

    $scope.myInterval = 1500;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    slides.push({
      image: 'image/mep01.jpg',
      id: currIndex++
    });

    slides.push({
      image: 'image/mep02.jpg',
      id: currIndex++
    });

    slides.push({
      image: 'image/mep03.jpg',
      id: currIndex++
    });

    slides.push({
      image: 'image/mep04.jpg',
      id: currIndex++
    });

    slides.push({
      image: 'image/mep05.jpg',
      id: currIndex++
    });

    slides.push({
      image: 'image/mep07.jpg',
      id: currIndex++
    });

  }
