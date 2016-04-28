// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

$ionicConfigProvider.tabs.position("bottom");
$ionicConfigProvider.navBar.alignTitle("center");

$stateProvider

    // setup an abstract state for the tabs directive
     .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tab.html'
    })

  // Each tab has its own nav history stack:

     .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('tab.coche', {
        url: '/coche',
        views: {
          'tab-coche': {
            templateUrl: 'templates/coche.html',
            controller: 'CocheCtrl'
          }
        }
      })
      .state('tab.comunidad', {
        url: '/comunidad',
        views: {
          'tab-comunidad': {
            templateUrl: 'templates/comunidad.html',
            controller: 'ComunidadCtrl'
          }
        }
      })
      .state('tab.user', {
        url: '/user/:id',
        views: {
          'tab-user': {
            templateUrl: 'templates/user.html',
            controller: 'UserCtrl'
          }
        }
      })
      .state('tab.datos', {
        url: '/datos',
        views: {
          'tab-datos': {
            templateUrl: 'templates/datos.html',
            controller: 'DatosCtrl'
          }
        }
      })
      .state('tab.info', {
        url: '/info',
        views: {
          'info': {
            templateUrl: 'templates/info.html',
          }
        }
      })

     $urlRouterProvider.otherwise('/tab/home');
})



.controller('HomeCtrl', function($scope) {
  console.log("Entrando en la home");
})



.controller('CocheCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('js/data.json')
  .success(function(data){
    $scope.detalles = data.detalles;
    $scope.data = {showReorder: false};
  });

  $scope.toggleDescripcion = function(item){
    item.resumido = !item.resumido;
  }

  $scope.moveItem = function(item, fromIndex, toIndex){
      $scope.detalles.splice(fromIndex, 1);
      $scope.detalles.splice(toIndex, 0, item);
  }

}])




.controller('ComunidadCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('js/data.json')
  .success(function(data){
    $scope.usuarios = data.usuarios;
  });
}])



.controller('UserCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('js/data.json')
  .success(function(data){
    $scope.data = data.usuarios[$state.params.id];
  });
}])




.controller('DatosCtrl', function($scope) {
  $scope.getPosicion = function(){
    var form = this;
    navigator.geolocation.getCurrentPosition(function(position){
      form.posicion = position.coords.latitude + " -- " + position.coords.longitude
    });
  }

  $scope.sendForm = function(){
    alert(this.nombre + " -- " + this.apellidos);
  }
})
