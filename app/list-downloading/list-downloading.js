'use strict';

angular.module('myApp.list-downloading', [
	'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/list-downloading', {
		templateUrl: 'list-downloading/list-downloading.html',
		controller: 'ListDownloadingCtrl'
	});
}])

.controller('ListDownloadingCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
	$scope.files = $rootScope.listFiles.downloading;
}]);