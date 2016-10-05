'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', [])
  .service('fileUpload', ['$http', function ($http) {
      this.uploadFileToUrl = function (file, uploadUrl) {
          var fd = new FormData();
          fd.append('file', file);
          $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: { 'Content-Type': undefined }
          })
          .success(function () {
          })
          .error(function () {
          });
      }
  }]);