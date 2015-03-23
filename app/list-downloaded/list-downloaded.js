'use strict';

angular.module('myApp.list-downloaded', [
	'ngRoute',
	'myApp.download-item'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/list-downloaded', {
		templateUrl: 'list-downloaded/list-downloaded.html',
		controller: 'ListDownloadedCtrl'
	});
}])

.controller('ListDownloadedCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
	$scope.files = $rootScope.listFiles.downloaded;
	$scope.remove = function(file) {
		if(confirm('Are you sure you want to remove this list?')) {
			file.remove($rootScope.listFiles.downloaded);
		}
	};
}]);