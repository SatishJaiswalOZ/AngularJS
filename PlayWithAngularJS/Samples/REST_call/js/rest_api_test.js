var scopeTestModule = angular.module('rest-app', ['ngRoute']);

function ProductController($scope, $http) {
	
	$scope.getAllProducts = function() {
		
	    var url = 'http://10.20.14.83:8080/product';
		$http.get(url).success(function(data, status) {
			var showText = '';
			angular.forEach(data, function(value, key) {
				
				angular.forEach(data.Products, function(value, key) {
					showText += "\nId: " + value.id + "\nName: " + value.name + "\nPrice: " + value.price + "\nQuantity: " + value.quantity + "\n";
				});
			});
			$scope.product = showText;
		});
	};
	
	$scope.createProduct = function() {
		$http({
			method : 'POST',
			url: 'http://10.20.14.83:8080/product',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://10.20.14.83:8080'
			},
			data : {
				name : 'Laptop',
				price : 30000,
				quantity : 15
			}
		}).then(function successCallback(response) {
			var data = response.data;
			if (response.data.Product.id != null) {
				//alert('product created: ' + response.data.Product.id);
				$scope.product = 'Product created:\n' + response.data.Product.id + '\n' + response.data.Product.name + '\n' + response.data.Product.price + '\n' + response.data.Product.quantity;
			} else {
				alert('product NOT created');
			}		
		}, function errorCallback(response) {
			alert("Server Error. Try After Some time: " + response);
		});
	}
	$scope.getAllProducts();
	
}

scopeTestModule.controller('ProductController', ProductController);
