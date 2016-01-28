(function() {
    'use strict';

    angular
        .module('app')
        .directive('qdNavbar', qdNavbar);

    function qdNavbar() {
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
            },
            templateUrl: 'app/components/qd-navbar.html'
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
    
    /* @ngInject */
    function Controller() {
        this.siteName = 'QuizDeck';
    }
})();
