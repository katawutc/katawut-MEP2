angular.module('app', ['ngRoute',
                       'ui.bootstrap',
                       'ngScrollGlue']);

/** Loading the Facebook SDK for JavaScript */
angular.module('app').run(['$window', '$rootScope',
                            FBAsyncInit]);

/** initialize note and chat panel on $rootScope */
angular.module('app').run(['$rootScope', initializeNoteChatPanel]);


/**  Loading the Facebook SDK for JavaScript */
function FBAsyncInit($window, $rootScope) {

  $rootScope.fbSdkLoaded = false;

  $window.fbAsyncInit = function() {
    FB.init({
      appId      : '948325255322737',
      status     : true,
      cookie     : true,  // enable cookies to allow the server to access
                      // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.11' // use graph api version 2.8
    });

    $rootScope.fbSdkLoaded = true;

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
