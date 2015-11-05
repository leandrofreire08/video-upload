'use strict';

/**
 * @ngdoc overview
 * @name psUploadApp
 * @description
 * # psUploadApp
 *
 * Main module of the application.
 */
angular
  .module('psUploadApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'blueimp.fileupload'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/uploader.html',
        controller: 'UploaderCtrl',
        controllerAs: 'uploader'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
