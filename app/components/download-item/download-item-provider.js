'use strict';

angular.module('myApp.download-item.provider', [
	'myApp.download-item.factory'
])

.provider('downloadItemProvider', [function() {
	this.$get = ['downloadItemFactory', function(downloadItemFactory) {

		return {
			newDownloadItem: newDownloadItem,
			moveToList: moveToList
		}
	}];

	function newDownloadItem(DownloadItem, obj) {
		return new DownloadItem(obj);
	}

	function moveToList(sourceList, destinationList, item) {
		var index = sourceList.indexOf(item);
		destinationList.push(item);
		sourceList.splice(index, 1);
	}
}]);