'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.header', //load modules
  'myApp.list-pending',
  'myApp.list-downloading',
  'myApp.list-downloaded',
  'myApp.version',
  'myApp.download-item.factory'
])
.config(['$routeProvider', function($routeProvider) {
	//route all undefined routes to "/list-pending"
 	$routeProvider.otherwise({redirectTo: '/list-pending'});
}])
.run(function($http, $rootScope, downloadItemFactory) {
	//use $rootScope so all controllers can access the list of files
	$rootScope.listFiles = {
		pending: [],
		downloading: [],
		downloaded: []
	};

	//on application starting up, read list of files from a json file.
	$http.get('list-files.json').success(function(response) {
		for(var i = 0; i < response.pending.length; i++) {
			var newDownloadItem = new downloadItemFactory(response.pending[i]);
			$rootScope.listFiles.pending.push(newDownloadItem);
		}
	});
});