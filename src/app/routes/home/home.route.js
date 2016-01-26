(function() {
    'use strict';
    
    angular
        .module('app')
        .config(config);
    
    function config($routeProvider) {
        $routeProvider.when('/', {
            controller: 'homeController',
            controllerAs: 'home',
            templateUrl: 'app/routes/home/home.html'
        });
    }
})();
