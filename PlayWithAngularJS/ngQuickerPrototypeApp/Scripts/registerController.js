(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope','$location', '$rootScope','UserService', 'FlashService'];
    function RegisterController($scope, $location, $rootScope,UserService, FlashService) {
        //$scope.$root.title = 'Prototype Quicker App | Register';
        var vm = this;

        $scope.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }

        //$scope.$on('$viewContentLoaded', function () {
        //    $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        //});
    }
})();
