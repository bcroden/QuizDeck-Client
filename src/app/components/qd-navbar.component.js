(function() {
    'use strict';
    
    angular
        .module('app')
        .component('qdNavbar', {
            controller: Controller,
            templateUrl: 'app/components/qd-navbar.html'
        });
    
    /* @ngInject */
    function Controller(authService) {
        this.siteName = 'QuizDeck';
        
        this.logout = authService.logout;
        this.isAuthenticated = authService.isAuthenticated;
    }
})();
