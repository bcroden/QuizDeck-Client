(function() {
    'use strict';
    
    angular
        .module('app')
        .config(config);
    
    function config($routeProvider) {
        $routeProvider.when('/create-account', {
            controller: 'createAccountController',
            controllerAs: 'ctrl',
            templateUrl: 'app/routes/create-account/create-account.html'
        });
    }
})();
