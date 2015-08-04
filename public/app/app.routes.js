var routes = angular.module('app.routes', ['ngRoute']);

routes.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when('/:room_id/', {
			templateUrl: 'app/views/chart.html',
			controller: 'mainController',
			controllerAs: 'main'
		})
		.otherwise({
			redirectTo: function(params, path, search) {
				var room_id = Math.floor(Math.random()*90000) + 10000;
				return '/id_' + room_id;
			}
		});

	$locationProvider.html5Mode(true);
});