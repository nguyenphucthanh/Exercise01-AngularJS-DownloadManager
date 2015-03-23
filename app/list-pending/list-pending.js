'use strict';

angular.module('myApp.list-pending', [
	'ngRoute',
	'myApp.download-item'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/list-pending', {
		templateUrl: 'list-pending/list-pending.html',
		controller: 'ListPendingCtrl'
	});
}])

.controller('ListPendingCtrl', ['$rootScope', '$scope', '$timeout', 'downloadItemProvider', function($rootScope, $scope, $timeout, downloadItemProvider) {
	$timeout(function() {
		$scope.files = $rootScope.listFiles.pending;
	});
	$scope.moveToDownloading = function(item) {
		item.start();
		downloadItemProvider.moveToList($rootScope.listFiles.pending, $rootScope.listFiles.downloading, item);
	};
}]);