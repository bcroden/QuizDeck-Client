(function() {
    'use strict';
    
    angular
        .module('app')
        .config(config);
    
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<qd-home/>'
            })
            .when('/dashboard', {
                authRole: 'User',
                template: '<qd-dashboard/>'
            })
            .otherwise('/');
    }
})();
