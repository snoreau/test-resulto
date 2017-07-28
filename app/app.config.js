
angular.module('testResulto').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('');

      $routeProvider.
        when('/events', {
          templateUrl: '/templates/events.html'
        }).
        otherwise('/events');
    }
  ]);