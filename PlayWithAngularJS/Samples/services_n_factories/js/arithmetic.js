var myApp = angular.module('arithmetic_app', []);

myApp.factory('arithmeticFactory', function() {
	var factoryObj = {};
	factoryObj.add = function (x, y) {
        return (parseInt(x) + parseInt(y));
    }
	factoryObj.subtract = function (x, y) {
        return x-y;
    }
	factoryObj.multiply = function (x, y) {
        return x*y;
    }
	factoryObj.divide = function (x, y) {
        return x/y;
    }
	return factoryObj;
});

myApp.service('arithmetic', function() {
    this.add = function (x, y) {
        return (parseInt(x) + parseInt(y));
    }
    this.subtract = function (x, y) {
        return x-y;
    }
    this.multiply = function (x, y) {
        return x*y;
    }
    this.divide = function (x, y) {
        return x/y;
    }
});

var controllers = {};
var ArithmeticController = function($scope, arithmetic, arithmeticFactory) {
	$scope.sum = function() {
		$scope.result = arithmetic.add($scope.x, $scope.y);
		$scope.result = arithmeticFactory.add($scope.x, $scope.y);
	}
	$scope.subtract = function() {
		$scope.result = arithmetic.subtract($scope.x, $scope.y);
	}
	$scope.multiply = function() {
		$scope.result = arithmetic.multiply($scope.x, $scope.y);
	}
	$scope.divide = function() {
		$scope.result = arithmetic.divide($scope.x, $scope.y);
	}
};
controllers.ArithmeticController = ArithmeticController;

myApp.controller(controllers);
