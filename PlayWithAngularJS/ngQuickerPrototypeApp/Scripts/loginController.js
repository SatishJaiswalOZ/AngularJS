(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginController);

    LoginController.$inject = ['$scope', '$location', '$window', 'AuthenticationService', 'FlashService'];
    function LoginController($scope, $location, $window, AuthenticationService, FlashService) {
        $scope.$root.title = 'Prototype Quicker App | Sign In';
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };

        $scope.login = function () {
            $location.path('/');
            return false;
        };
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }
})();
