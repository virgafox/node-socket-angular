var mainCtrl = angular.module('mainCtrl', ['socketService', 'monospaced.qrcode']);

mainCtrl.controller('mainController', function($scope, $routeParams, $location, socket) {
	
	var vm = this;

	vm.room_id = $routeParams.room_id;
	vm.qrdata = $location.absUrl();
	vm.value = 30;
	vm.socket_id = "";

	socket.on('connect', function() {
		console.log('connected!');
		socket.emit('init_server', {
			room_id: vm.room_id
		});
	});

	socket.on('init_client', function(data) {
		vm.socket_id = data.socket_id;
		console.log('socket_id: '+vm.socket_id);
	});

	socket.on('update_value_from_server', function(data) {
		vm.value = data.value;
		console.log('received new real-time value: ' + data.value);
	});

	socket.on('new_device', function(data) {
		console.log('new device connected: ' + data.device_id);
	});

	vm.syncValue = function() {
		socket.emit('update_value_to_server', {
			value: vm.value,
			room_id: vm.room_id
		});
		console.log('sent new real-time value: ' + vm.value);
	};
});