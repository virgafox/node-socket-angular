var socketService = angular.module('socketService', ['btford.socket-io']);

socketService.factory('socket', function (socketFactory, $location) {
  return socketFactory();
});