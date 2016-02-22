(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(run);
    
    function config($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
    
    function run(routeAuthService) {
        routeAuthService.init();
    }
})();
