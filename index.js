
angular.module('MyApp',['ngMaterial', 'ngMessages'])
  .config(function($mdIconProvider) {
    $mdIconProvider
      .iconSet('device', 'img/icons/sets/device-icons.svg', 24);
  })
  
.controller('AppCtrl', function($scope) {
 
})

