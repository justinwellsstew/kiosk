 var myApp = angular.module('myApp', [
  'ngMap',
  'ngRoute', 
  'kioskController', 
  'ui.bootstrap'
  ]);


 myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/news', {
      templateUrl : 'partials/news.html',
      controller: 'NewsCtrl'
    }).
    when('/directory', {
      templateUrl : 'partials/directory.html',
      controller: 'DirectoryCtrl'
    }).
    when('/details/:itemId', {
      templateUrl : 'partials/details.html',
      controller: 'DetailsCtrl'
    }).
    when('/maps/', {
      templateUrl : 'partials/maps.html',
      controller: 'MapsCtrl'
    }).
    when('/calendar/', {
      templateUrl : 'partials/calendar.html',
      controller: 'CalendarCtrl'
    }).
    otherwise({
      redirectTo: '/news'
    });
  }]);
     
      

      