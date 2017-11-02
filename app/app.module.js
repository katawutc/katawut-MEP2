angular.module('app', ['ngRoute',
                       'ui.bootstrap',
                       'ngScrollGlue']);

// to put app.run to init FB sdk here

angular.module('app').run(['$rootScope', initializeNoteChatPanel]);

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
