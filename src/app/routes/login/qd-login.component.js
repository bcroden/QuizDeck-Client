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

        this.login = login;

        function login() {
            authService.login({
                "username": this.username,
                "password": this.password
            })
            .then(function() {
                $location.path('/dashboard');
            })
            .catch(function(){
               // Give a unique and personal error to every single person
               // crafted from various information harvested from their facebook
               // page into the perfect insult that will destroy thier self-confidence
               // and render them completely defeated emotionally and socially.
            });
        }
     }
})();
