(function() {
    'use strict';

    angular
        .module('app')
        .controller('createAccountController', CreateAccountController);

    function CreateAccountController(authService, $location) {
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
