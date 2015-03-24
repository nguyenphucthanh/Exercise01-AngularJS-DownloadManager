'use strict';

angular.module('myApp.list-downloaded', [
	'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/list-downloaded', {
		templateUrl: 'list-downloaded/list-downloaded.html',
		controller: 'ListDownloadedCtrl'
	});
}])

.controller('ListDownloadedCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
	$scope.files = $rootScope.listFiles.downloaded;
}]);