
angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
  .config(function($mdIconProvider) {
    $mdIconProvider
      .iconSet('device', 'img/icons/sets/device-icons.svg', 24);
  })
  
.controller('AppCtrl', function($scope) {

  $scope.params = {
    distance: 200,
    width: 5,
	x0: 0,
    deltax: 0,
	lambda:630,
	extended:false
  }

  $scope.myMethod = function(){
	  
	  updateParams($scope.params)
	  
  }
  
  $scope.switchExtended = function(){
	  
	  if ($scope.params.extended){
		  $scope.params.deltax = 100
		  //document.getElementsByTagName("md-slider")[2].removeAttribute("disabled")
		  document.getElementsByTagName("md-slider")[3].removeAttribute("disabled")
      } else {
		  $scope.params.deltax = 0
		  //document.getElementsByTagName("md-slider")[2].setAttribute("disabled","")
		  document.getElementsByTagName("md-slider")[3].setAttribute("disabled","")
	  }
	  updateParams($scope.params)
	  
  }
  
  setCanvaSize(100,250)
  updateParams($scope.params)
  $scope.switchExtended()
 
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