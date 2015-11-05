'use strict';

angular.module('psUploadApp')
  .directive('ngUploadFile', [function () {
          return {
        restrict: 'E',
        templateUrl: 'scripts/directives/templates/fileForm.html',
        scope: {
          allowed: '@',
          url: '@',
          autoUpload: '@',
          sizeLimit: '@',
          ngModel: '=',
          name: '@'
        },
        controller: ['$timeout', '$rootScope', '$scope', '$element', '$sce', 'fileUpload', 'Wistia', function (
            $timeout, $rootScope, $scope, $element, $sce, fileUpload, Wistia) {
        	
        	$scope.apiPassword = Wistia.getApiPassword();
  			$scope.projectId = Wistia.getProjectId();
        	$scope.waitingWistiaVideo = false;

          	$scope.$on('fileuploaddone', function (e, data) {

	          	var hashedId = data.result.hashed_id;

	          	$scope.showVideo = true;
	          	$scope.hashedId = hashedId;

	          	function checkVideoStatus() {
	          		$scope.waitingWistiaVideo = true;
					Wistia.getVideoStatus(hashedId).then(function (response) {
						$rootScope.$emit('video-status', response.status);          			
					});
	          	}

          		checkVideoStatus();

          		$rootScope.$on('video-status', function (event, data) {
          			if (data !== 'ready') {
          				$timeout(function() {
          					checkVideoStatus();
          				}, 2000);
          			} else {
          				$scope.waitingWistiaVideo = false;
          				$scope.wistiaIFrame = $sce.trustAsHtml('<iframe src="//fast.wistia.net/embed/iframe/'+ hashedId +'" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="640" height="360"></iframe>');
          			}
          		});
          	});

          $scope.options = {
            url: $scope.url,
            dropZone: $element,
            maxFileSize: $scope.sizeLimit,
            autoUpload: $scope.autoUpload
          };
          $scope.loadingFiles = false;

          if (!$scope.queue) {
            $scope.queue = [];
          }

          var generateFileObject = function generateFileObjects(objects) {
            angular.forEach(objects, function (value, key) {
              var fileObject = {
                name: value.filename,
                size: value.length,
                url: value.url,
                thumbnailUrl: value.url,
                result: value
              };

              if (fileObject.url && fileObject.url.charAt(0) !== '/') {
                fileObject.url = '/' + fileObject.url;
              }

              if (fileObject.thumbnailUrl && fileObject.thumbnailUrl.charAt(0) !== '/') {
                fileObject.thumbnailUrl = '/' + fileObject.thumbnailUrl;
              }

              $scope.queue[key] = fileObject;
            });
          };

          $scope.$watchCollection('filequeue', function (newval) {
            generateFileObject(newval);
          });
        }]
      };
  }]);
