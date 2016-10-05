'use strict';

angular.module('app.directives', [])
  .directive('addLoan', function () {
      return {
          restrict: 'E',
          replace: true,
          template: '<a href="http://google.com">Click me to go to Google</a>'
      }
  })