'use strict';

angular.module('myApp.header', [])

.controller('HeaderCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function (viewLocation) { 
		return viewLocation === $location.path();
	};
}]);