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

.controller('ListPendingCtrl', ['$rootScope', '$scope', 'downloadItemProvider', function($rootScope, $scope, downloadItemProvider) {
	$scope.files = $rootScope.listFiles.pending;
	$scope.moveToDownloading = function(item) {
		item.start();
		downloadItemProvider.moveToList($rootScope.listFiles.pending, $rootScope.listFiles.downloading, item);
	};
}]);