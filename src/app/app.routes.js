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
            .when('/create-account', {
                template: '<qd-create-account/>'
            })
            .when('/dashboard', {
                authRole: 'User',
                template: '<qd-dashboard/>'
            })
            .otherwise('/');
    }
})();
