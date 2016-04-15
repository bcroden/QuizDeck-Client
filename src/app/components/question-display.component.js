(function() {
    'use strict';
    
    angular
        .module('app')
        .component('questionDisplay', {
            controller: Controller,
            templateUrl: 'app/components/question-display.html',
            bindings: {
                question: '=',
                nextQuestion: '&'
            }
        })
    
    /* @ngInject */
    function Controller() {
        var vm = this;
    }
})();
