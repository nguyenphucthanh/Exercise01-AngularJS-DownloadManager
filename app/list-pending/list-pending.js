'use strict';

angular.module('myApp.list-pending', [
	'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/list-pending', {
		templateUrl: 'list-pending/list-pending.html',
		controller: 'ListPendingCtrl'
	});
}])

.controller('ListPendingCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
	$scope.files = $rootScope.listFiles.pending;
}]);