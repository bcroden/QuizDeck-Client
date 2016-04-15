(function () {
    'use strict';

    angular
        .module('app')
        .component('qdLogin', {
            controller: Controller,
            templateUrl: 'app/routes/login/qd-login.html'
        });

    /* @ngInject */
    function Controller(authService, $location) {
        var vm = this;

        vm.login = login;

        ////////////////

        function login() {
            if(vm.waiting)
                return;
            
            vm.waiting = true;
            
            authService
                .login({
                    username: vm.username,
                    password: vm.password
                })
                .then(function() {
                    $location.path('/dashboard');
                })
                .catch(function(){
                    vm.waiting = false;
                    vm.errored = true;
                });
        }
     }
})();
