(function() {
    'use strict';
    
    angular
        .module('app')
        .service('authInterceptor', AuthInterceptor)
        .config(config);
    
    function AuthInterceptor($window) {
        this.request = request;
        
        ////////////////
        
        function request(config) {
            config.headers = config.headers || {};
            
            if($window.sessionStorage.authToken)
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.authToken;
            
            return config;
        }
    }
    
    function config($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }
})();
