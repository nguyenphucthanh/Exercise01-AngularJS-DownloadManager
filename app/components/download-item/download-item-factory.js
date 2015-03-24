'use strict';

angular.module('myApp.download-item.factory', [])

.factory('downloadItemFactory', ['$interval', function($interval) {

	var _speed = 25; //example 25KB/s

	var DownloadItem = function(obj) {
		this.id = obj.id;
		this.path = obj.path;
		this.size = obj.size;
		this.percentCompleted = 0;
		this.completed = 0;
		this.promise = null;
		this.isDownloading = false;
		this.onComplete = function() {};
	};

	DownloadItem.prototype.start = function(callback) {
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
				if(angular.isFunction(self.onComplete)) {
					self.onComplete();
				}
			}
		}, 1000);
		if(angular.isFunction(callback)) {
			callback.call(self);
		}
	};

	DownloadItem.prototype.pause = function(callback) {
		var self = this;
		self.isDownloading = false;
		$interval.cancel(this.promise);
		if(angular.isFunction(callback)) {
			callback.call(self);
		}
	};

	DownloadItem.prototype.stop = function(callback) {
		var self = this;
		self.isDownloading = false;
		$interval.cancel(this.promise);
		this.completed = 0.0;
		this.percentCompleted = 0.0;
		if(angular.isFunction(callback)) {
			callback.call(self);
		}
	};

	DownloadItem.prototype.remove = function(fromList) {
		var self = this;
		var index = fromList.indexOf(self);
		fromList.splice(index, 1);
	}

	return DownloadItem;

}]);