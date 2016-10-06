'use strict';
angular.module('app.controllers', [])

    // Path: /
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$window', 'UserService','fileUpload', function ($rootScope, $scope, $location, $window, UserService) {
        $scope.$root.title = 'Loan Analytics App';
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        $scope.uploadFile = function () {
            var file = $scope.myFile;
            console.log('file is ');
            console.dir(file);
            var uploadUrl = "/fileUpload";
            fileUpload.uploadFileToUrl(file, uploadUrl);
        };

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /login
    .controller('LoginCtrl', ['$scope', '$location', '$window', 'AuthenticationService', 'FlashService', function ($scope, $location, $window, AuthenticationService, FlashService) {
        $scope.$root.title = 'Loan Analytics App | Sign In';
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
    }])

     // Path: /Register
    .controller('RegisterCtrl', ['$scope', '$location', '$window', 'FlashService', 'UserService',
        function ($scope, $location, $window, FlashService, UserService) {
        $scope.$root.title = 'Loan Analytics App | Register';
        var vm = this;
        vm.register = register;

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

        $scope.register = function () {
            $location.path('/');
            return false;
        };
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

// ========== initialize documentation app module ========== //
angular.module('adaptv.adaptStrapDocs', [
  'ngSanitize',
  'adaptv.adaptStrap'
])

// ========== controllers ========== //
.controller('tableliteCtrl', ['$scope', function ($scope) {
    $scope.models = {
        changeInfo: [],
        searchText: '',
        selectedCars: [
          {
              id: 1,
              name: 'Loan 001',
              modelYear: 2009,
              price: 34000
          }
        ],
        carsForSale: [
          {
              id: 1,
              name: 'Loan 002',
              modelYear: 2009,
              price: 34000
          },
          {
              id: 2,
              name: 'Loan 003',
              modelYear: 2012,
              price: 39000
          },
          {
              id: 3,
              name: 'Loan 004',
              modelYear: 2012,
              price: 44000
          },
          {
              id: 4,
              name: 'Loan 005',
              modelYear: 2014,
              price: 100000
          },
          {
              id: 5,
              name: 'Loan 006',
              modelYear: 2009,
              price: 34000
          },
          {
              id: 6,
              name: 'Loan 007',
              modelYear: 2012,
              price: 39000
          },
          {
              id: 7,
              name: 'Loan 008',
              modelYear: 2012,
              price: 44000
          },
          {
              id: 8,
              name: 'Loan 009',
              modelYear: 2014,
              price: 100000
          },
          {
              id: 9,
              name: 'Loan 010',
              modelYear: 2012,
              price: 44000
          },
          {
              id: 10,
              name: 'Loan 011',
              modelYear: 2014,
              price: 100000
          },
          {
              id: 11,
              name: 'Loan 012',
              modelYear: 2012,
              price: 44000
          },
          {
              id: 12,
              name: 'Loan 013',
              modelYear: 2014,
              price: 100000
          }
        ],
        state: {
            sortKey: 'name',
            sortDirection: 'DEC'
        }
    };

    $scope.carsTableColumnDefinition = [
      {
          columnHeaderDisplayName: 'Loan Name',
          displayProperty: 'name',
          sortKey: 'name',
          columnSearchProperty: 'name',
          visible: true
      },
      {
          columnHeaderTemplate: '<span><i class="glyphicon glyphicon-calendar"></i> Created On</span>',
          template: '<strong>{{ item.modelYear }}</strong>',
          sortKey: 'modelYear',
          width: '12em',
          columnSearchProperty: 'modelYear'
      },
      {
          columnHeaderTemplate: '<span><i class="glyphicon glyphicon-usd"></i> Loan Amt.</span>',
          displayProperty: 'price',
          cellFilter: 'currency',
          sortKey: 'price',
          width: '9em',
          columnSearchProperty: 'price'
      },
      {
          columnHeaderDisplayName: 'Analyze',
          templateUrl: 'src/tablelite/docs/buyCell.html',
          width: '4em'
      }
    ];

    $scope.onDragChange = function (o, n, data) {
        $scope.models.changeInfo.push({
            startPosition: o,
            endPosition: n,
            data: data
        });
    };

    $scope.onStateChange = function (state) {
        alert(JSON.stringify(state));
    };

    // ========== ui handlers ========== //
    $scope.buyCar = function (car) {
        alert(car.name);
    };

    $scope.rowExpanded = function (car) {
        alert(car.name + ' row expanded');
    };

    $scope.checkRowSelected = function (item, index) {
        var found = false;
        $scope.models.selectedCars.forEach(function (selectedItem) {
            if (item.id === selectedItem.id) {
                found = true;
            }
        });
        return found ? 'info row-' + index : 'row-' + index;
    };
}]);