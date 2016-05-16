 var myApp = angular.module('myApp', [
  'leaflet-directive',
  'ngRoute', 
  'kioskController'
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
    when('/maps/', {
      templateUrl : 'partials/maps.html',
      controller: 'MapsCtrl'
    }).
     when('/maps/:buildingId', {
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

  myApp.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.binghamton.edu/webapps/calendar/**',
        'https://www.binghamton.edu/webapps/directory/dept/profile/**'
    ]);
  });


     
      

      