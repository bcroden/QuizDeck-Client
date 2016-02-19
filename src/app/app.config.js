(function() {
    'use strict';

    angular
        .module('app')
        .config(config);
    
    function config($locationProvider, routeAuthService) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        
        routeAuthService.init();
    }
})();
