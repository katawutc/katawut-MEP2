angular.module('app', ['ngRoute',
                       'ui.bootstrap',
                       'ngScrollGlue']);

angular.module('app').run(['$rootScope', initializeNoteChatPanel]);

function initializeNoteChatPanel($rootScope) {

  console.log('at run: initializeNoteChatPanel');

  $rootScope.showChatPanel = false;
  $rootScope.showNotePanel = false;

  $rootScope.sentMessage = [];
}
