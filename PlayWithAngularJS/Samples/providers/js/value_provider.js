var myModule = angular.module('valueProviderApp', ['ngRoute']);

myModule.value('token', 'A5612R');
myModule.constant('log_level', 'DEBUG');

function Message(text) {
	this.text = text;
	this.getMessage = function() {
		return this.text;
	}
}

myModule.provider('message', function() {
	var str = 'Default message';
	this.$get = function(){
			return new Message(str);
	};
	this.setStr = function(text) {
		str = text;
	}
})

myModule.config(function(messageProvider) {
	messageProvider.setStr("Welcome to Xoriant");
	alert("Message: " + messageProvider.$get().getMessage());
});



function ValueProviderController(token, log_level) {
	this.controller_token = token;
	this.controller_log_level = log_level;
}

myModule.controller('ValueProviderController', 
		['token', 'log_level', ValueProviderController]);

