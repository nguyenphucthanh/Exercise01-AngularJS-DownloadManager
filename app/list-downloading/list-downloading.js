'use strict';

angular.module('myApp.list-downloading', [
	'ngRoute',
	'myApp.download-item.provider'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/list-downloading', {
		templateUrl: 'list-downloading/list-downloading.html',
		controller: 'ListDownloadingCtrl'
	});
}])

.controller('ListDownloadingCtrl', ['$rootScope', '$scope', 'downloadItemProvider', function($rootScope, $scope, downloadItemProvider) {
	$scope.files = $rootScope.listFiles.downloading;
	$scope.moveToPending = function(item) {
		if(confirm('Are you sure you want to stop downloading this file?')) {
			item.stop();
			downloadItemProvider.moveToList($rootScope.listFiles.downloading, $rootScope.listFiles.pending, item);
		}
	}
}]);