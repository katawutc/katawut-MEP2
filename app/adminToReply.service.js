angular.module('app')
.factory('adminToReplyService',
        ['$window', '$http', '$q',
          adminToReplyService]);

function adminToReplyService($window, $http, $q) {

  return {
    getToReplyList : function() {

      var toReplyListUrl = '/adminToReply/'+
                             $window.sessionStorage.userID;

      var deferred = $q.defer();

      $http({
        url: toReplyListUrl,
        method: 'GET',
        headers: {
          'Authorization': 'JWT ' + $window.sessionStorage.token
          }
      }).then(function successCallback(response) {
        deferred.resolve(response.data);

      },function errorCallback(response){

      });
      return  deferred.promise;

    }
  }
}
