'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', [])
  .service('fileUpload', ['$http', function ($http) {
      this.uploadFileToUrl = function (file, uploadUrl) {
          $http({
              method: 'POST',
              url:uploadUrl,
              data:file ,
              headers: { "Content-Type": 'application/xml' }
          })
          .success(function () {
          })
          .error(function (error) {
          });
      }
  }]);