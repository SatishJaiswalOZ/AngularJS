var myModule = angular.module('arithmetic_app', ['ngRoute']);

function arithFactory() {
	var factoryObj = {};
	//custom code
	factoryObj.sum = function(x, y) {
		return parseInt(x) + parseInt(y);
	}
	factoryObj.subtract = function(x, y) {
		return parseInt(x) - parseInt(y);
	}
	factoryObj.divide = function(x, y) {
		return parseInt(x) / parseInt(y);
	}
	factoryObj.multiply = function(x, y) {
		return parseInt(x) * parseInt(y);
	}
	return factoryObj;
}
myModule.factory('arithmeticFactory', arithFactory);

function arithService() {
	this.sum = function(x, y) {
		return parseInt(x) + parseInt(y);
	}
	this.subtract = function(x, y) {
		return parseInt(x) - parseInt(y);
	}
	this.divide = function(x, y) {
		return parseInt(x) / parseInt(y);
	}
	this.multiply = function(x, y) {
		return parseInt(x) * parseInt(y);
	}
}

myModule.service('arithmeticService', arithService);

function arithController($scope, arithmeticService, arithmeticFactory, $location) {
	$scope.sum = function() {
		$scope.result = arithmeticFactory.sum($scope.x, $scope.y);
		$location.path('/show_result/' + $scope.result);
		
	}
	$scope.subtract = function() {
		$scope.result = arithmeticFactory.subtract($scope.x, $scope.y);
	}
	$scope.multiply = function() {
		$scope.result = arithmeticFactory.multiply($scope.x, $scope.y);
	}
	$scope.divide = function() {
		$scope.result = arithmeticFactory.divide($scope.x, $scope.y);
	}
}

myModule.controller('ArithmeticController', arithController);

myModule.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			controller: 'ArithmeticController',
			templateUrl: 'arithmetic.html'
		})
		.when("/show_result/:result", {
			controller: function($scope, arithmeticFactory, $routeParams) {
				$scope.result = $routeParams.result;
			},
			templateUrl: 'show_result.html'
		})
		.otherwise({redirectTo: '/'})
});







