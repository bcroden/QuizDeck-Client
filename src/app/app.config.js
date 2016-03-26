(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(run);
    
    function config($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
    
    function run(routeAuthService, $http, serverUrl) {
        routeAuthService.init();
        
        // The server apparently returns plaintext... this is a workaround.
        // TODO: Yell at server team to make it return json.
        $http.get(serverUrl+'/rest/nonsecure/server/wakeup/wakup_server', {
            transformResponse: [function (data) {
                return data;
            }]
        });
    }
})();
