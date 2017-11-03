angular.module('app', ['ngRoute',
                       'ui.bootstrap',
                       'ngScrollGlue']);

/** Loading the Facebook SDK for JavaScript */
angular.module('app').run(['$window', FBAsyncInit]);

/** initialize note and chat panel on $rootScope */
angular.module('app').run(['$rootScope', initializeNoteChatPanel]);

/**  Loading the Facebook SDK for JavaScript */
function FBAsyncInit($window) {

  $window.fbAsyncInit = function() {
    FB.init({
      appId      : '141198316480017',
      status     : true,
      cookie     : true,  // enable cookies to allow the server to access
                      // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });
  };
}

/** initialize note and chat panel on $rootScope */
function initializeNoteChatPanel($rootScope) {

  $rootScope.showChatPanel = false;
  $rootScope.showNotePanel = false;

  $rootScope.quickNote = {};

  $rootScope.quickNote.title = '';
  $rootScope.quickNote.note = '';

  // clean up sent chat message
  $rootScope.sentMessage = [];
}
