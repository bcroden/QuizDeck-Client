(function() {
    'use strict';
    
    angular
        .module('app')
        .service('routeAuthService', RouteAuthService);
    
    function RouteAuthService($rootScope, $location, authService) {
        this.init = init;
        
        ///////////////
        
        function init() {
            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                var route = next.$$route;
                if(route && route.authRole && (!authService.isAuthenticated() || !authService.hasRole(route.authRole))) {
                    event.preventDefault()
                    $location.path(route.authRedirect || '/login');
                    
                    //Remove last url from browser history so the back button is not "stuck".
                    $location.replace();
                }
            });
        }
    }
})();
