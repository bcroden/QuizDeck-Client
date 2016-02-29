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
            .when('/quiz-management', {
                authRole: 'User',
                template: '<qd-quiz-management/>'
            })
            .when('/login', {
                template: '<qd-login/>'
            })
            .when('/subscriber-management',{
                template: '<qd-subscriber-management/>'
            })
            .otherwise('/');
    }
})();
