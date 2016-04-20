(function() {
    'use strict';

    angular
        .module('app')
        .service('wakeupService', WakeupService);

    function WakeupService($http, serverUrl) {
        this.init = init;

        ////////////////

        function init() {
            $http.get(serverUrl+'/rest/nonsecure/server/wakeup/wakup_server', {
                transformResponse: function(data) {
                    return data;
                }
            });
        }
    }
})();
