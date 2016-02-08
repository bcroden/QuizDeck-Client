(function() {
    'use strict';
    
    angular
        .module('app')
        .config(config);
    
    function config($routeProvider) {
        $routeProvider.when('/login', {
            controller: 'loginController',
            controllerAs: 'ctrl',
            templateUrl: 'app/routes/login/login.html'
        });
    }
})();