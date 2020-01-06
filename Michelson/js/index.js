
angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
  .config(function($mdIconProvider) {
    $mdIconProvider
      .iconSet('device', 'img/icons/sets/device-icons.svg', 24);
  })
  
.controller('AppCtrl', function($scope) {

  $scope.params = {
    thetax: 0,
    thetay: 0,
    delta: 0,
	lambda:550,
	lightSource:0
  }

  $scope.myMethod = function(){
	  
	  updateParams($scope.params)
	  
  }
  
  $scope.switchWL = function(){
	  
	  if ($scope.params.whiteLight){
		  lightSource = 1
		  $scope.params.delta = 0
		  document.getElementsByTagName("md-slider")[2].setAttribute("disabled","")
		  document.getElementsByTagName("md-slider")[3].setAttribute("disabled","")
      } else {
		  lightSource = 0
		  document.getElementsByTagName("md-slider")[2].removeAttribute("disabled")
		  document.getElementsByTagName("md-slider")[3].removeAttribute("disabled")
	  }
	  updateParams($scope.params)
	  
  }
  
  setCanvaSize(300,300)
  updateParams($scope.params)
 
})

.directive('testDragEnd', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('$md.dragend', function() {
                console.log('Drag Ended');
            })
			element.on('$md.pressdown', function(){console.log('pressdown')})
			element.on('$md.drag', function(){console.log('drag')})
        }
    }
});


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/