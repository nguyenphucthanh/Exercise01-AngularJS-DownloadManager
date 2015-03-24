'use strict';

angular.module('myApp.download-item.factory', [])

.factory('downloadItemFactory', ['$interval', '$rootScope', function($interval, $rootScope) {

	var _speed = 100; //example 25KB/s

	var DownloadItem = function(obj) {
		this.id = obj.id;
		this.path = obj.path;
		this.size = obj.size;
		this.percentCompleted = 0;
		this.completed = 0;
		this.promise = null;
		this.isDownloading = false;
	};

	DownloadItem.prototype.start = function() {
		var self = this;
		self.isDownloading = true;
		this.promise = $interval(function() {
			if((self.size - self.completed) < _speed) {
				self.completed = self.size;
			}
			else {
				self.completed += _speed;
			}
			self.percentCompleted = parseInt((self.completed * 100) / self.size, 10);
			if(self.percentCompleted === 100) {
				$interval.cancel(self.promise);
				var index = $rootScope.listFiles.downloading.indexOf(self);
				$rootScope.listFiles.downloading.splice(index, 1);
				$rootScope.listFiles.downloaded.push(self);
			}
		}, 1000);

		var index = $rootScope.listFiles.pending.indexOf(self);
		$rootScope.listFiles.pending.splice(index, 1);
		$rootScope.listFiles.downloading.push(self);
	};

	DownloadItem.prototype.pause = function() {
		var self = this;
		self.isDownloading = false;
		$interval.cancel(this.promise);
	};

	DownloadItem.prototype.stop = function() {
		var self = this;
		self.isDownloading = false;
		$interval.cancel(this.promise);
		this.completed = 0.0;
		this.percentCompleted = 0.0;

		var index = $rootScope.listFiles.downloading.indexOf(self);
		$rootScope.listFiles.downloading.splice(index, 1);
		$rootScope.listFiles.pending.push(self);
	};

	DownloadItem.prototype.remove = function() {
		var self = this;
		var index = $rootScope.listFiles.downloaded.indexOf(self);
		$rootScope.listFiles.downloaded.splice(index, 1);
	}

	return DownloadItem;

}]);