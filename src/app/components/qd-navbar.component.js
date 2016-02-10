(function() {
    'use strict';
    
    angular
        .module('app')
        .component('qdNavbar', {
            controller: Controller,
            templateUrl: 'app/components/qd-navbar.html'
        });
    
    /* @ngInject */
    function Controller() {
        this.siteName = 'QuizDeck';
    }
})();
