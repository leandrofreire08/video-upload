'use strict';

angular.module('psUploadApp').factory('Wistia', ['$http', '$q', function ($http, $q) {
    
    var urlBase = 'https://api.wistia.com/v1/';
    var apiPassword = '709595146c6b8fcb403184fba875f6c9529a95ff5dbf277f3dc08e95ac2d91c9';
    var projectId = "47uj88ic38";
    var wistiaService = {};

    wistiaService.getVideoStatus = function (hashedId) {
      var deferred = $q.defer();
      $http({
        url: urlBase + 'medias/' + hashedId + '.json',
        method: 'GET',
        params: {api_password: apiPassword}
      })
      .success(function (response){
        deferred.resolve(response);
      });

      return deferred.promise;
    };

    wistiaService.getApiPassword = function() {
      return apiPassword;
    };

    wistiaService.getProjectId = function() {
      return projectId;
    };

    return wistiaService;

  }]);
