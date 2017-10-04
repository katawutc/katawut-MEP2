angular.module('app').factory('suNewTestService',
  ['$http', '$route', '$q', '$window', suNewTestService]);

function suNewTestService($http, $route, $q, $window) {

   return {
     getSuNewTest : function() {
       console.log('at suNewTestService: getSuNewTest');

       /**
        * 1. generate new suTestID based on setting
        * 2. there will be 2 new suTestID at one time
        * 3. determine the suTestIDNumber
        * 4. if setting is changed and new suTestID is not taken/registered, \
        *    create new suTestID to replace the current ones
        * 5. if new suTestID is taken/registered, the suTestID will be removed \
        *    from the dashboard new test; new suTestID is generated based on \
        *    settings
        * 6. there will be 0 to 2 suTestID in recent test at one time
        */


     }
   }
 }
