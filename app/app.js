'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.header',
  'myApp.list-pending',
  'myApp.list-downloading',
  'myApp.list-downloaded',
  'myApp.version',
  'myApp.download-item'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/list-pending'});
}])
.run(function($http, $rootScope, downloadItemProvider) {	
	$rootScope.listFiles = {
		pending: [],
		downloading: [],
		downloaded: []
	};

	$http.get('list-files.json').success(function(response) {
		for(var i = 0; i < response.pending.length; i++) {
			var newDownloadItem = downloadItemProvider.newDownloadItem(response.pending[i]);
			newDownloadItem.onComplete = function() {
				downloadItemProvider.moveToList($rootScope.listFiles.downloading, $rootScope.listFiles.downloaded, this);
			}
			$rootScope.listFiles.pending.push(newDownloadItem);
		}
	});
});