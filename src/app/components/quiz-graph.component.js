(function() {
    'use strict';
    
    angular
        .module('app')
        .component('quizGraph', {
            controller: Controller,
            templateUrl: 'app/components/quiz-graph.html',
            bindings: {
                answers: '=',
            }
        })
    
    /* @ngInject */
    function Controller() {
        var vm = this;
        
        vm.$onInit = function() {
            
        }
    }
})();
