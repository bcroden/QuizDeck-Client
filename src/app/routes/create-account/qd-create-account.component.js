(function() {
    'use strict';
    
    angular
        .module('app')
        .component('qdCreateAccount', {
            controller: Controller,
            templateUrl: 'app/routes/create-account/qd-create-account.html'
        });
    
    /* @ngInject */
    function Controller(authService, $location) {
        this.createAccount = createAccount;
        
        //////////////
        
        function createAccount() {
            authService
                .createAccount({
                    username: this.username,
                    password: this.password,
                    email: this.email
                })
                .then(function() {
                    $location.path('/dashboard');
                })
                .catch(function() {
                    // Do stuff
                });
        }
    }
})();
