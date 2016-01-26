(function() {
    'use strict';

    angular
        .module('app')
        .config(config);
    
    function config($locationProvider, $routeProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        
        $routeProvider.otherwise('/');
    }
})();
