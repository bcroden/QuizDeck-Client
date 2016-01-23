(function() {
    'use strict';

    angular
        .module('app')
        .service('testService', TestService);
    
    function TestService($http) {
        this.func = func;
        
        ////////////////

        function func() {
            return true;
        }
    }
})();
