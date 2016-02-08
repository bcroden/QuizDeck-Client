(function() {
    'use strict';
    
    angular
        .module('app')
        .config(config);
    
    function config($routeProvider) {
        $routeProvider.when('/subscriber-management', {
            controller: 'subscriberManagementController',
            controllerAs: 'ctrl',
            templateUrl: 'app/routes/subscriber-management/subscriber-management.html'
        });
    }
})();