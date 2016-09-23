var myModule = angular.module('customDirectiveApp', ['ngRoute']);




myModule.directive('ngAnand', function() {
	return {
		restrict: 'AE',//E = element, A = attribute, C = class, M = comment
		template: '<h1>Hello Anand</h1>',
		templateUrl: 'view_table.html',
		link: function(scope, iElement, iAttrs) {
		      alert("link() function called");
		}
	}
});










function SensorController($scope) {
	$scope.detect = function(temperature) {
		if(temperature > 30)
			alert("Its hot");
		else
			alert("Its cold");
	}
}
myModule.controller('SensorController', SensorController);

myModule.directive('ngSensor', function() {
	return {
		restrict: 'A',
		required: '^ngModel',
		controller: SensorController,
		link: function(scope, iElement, iAttrs) {
			scope.detect(iAttrs.value);
		    console.log(iAttrs);
		}
	}
});











