angular.module('app').controller('reviseSuTestExamAnswerSheetCtrl',
                                  ['$scope', '$http', '$routeParams',
                                    '$window', '$location',
                                      'currentUserAnswer', 'currentExamQuestion',
                                      reviseSuTestExamAnswerSheetCtrl]);

function reviseSuTestExamAnswerSheetCtrl($scope, $http, $routeParams,
                                          $window, $location,
                                          currentUserAnswer, currentExamQuestion) {

  console.log('at reviseSuTestExamAnswerSheetCtrl');

  console.log(currentUserAnswer);

  console.log(currentExamQuestion);



}
