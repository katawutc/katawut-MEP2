angular.module('app', ['ngRoute',
                       'ui.bootstrap',
                       'ngScrollGlue']);

angular.module('app').run(['$rootScope', initializeNoteChatPanel]);

/** initialize note and chat panel on $rootScope */
function initializeNoteChatPanel($rootScope) {

  $rootScope.showChatPanel = false;
  $rootScope.showNotePanel = false;

  // clean up sent chat message
  $rootScope.sentMessage = [];
}
