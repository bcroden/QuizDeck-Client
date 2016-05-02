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
        
        vm.getTotalAnswers = getTotalAnswers;
        vm.getStyle = getStyle;
        
        vm.$onInit = function() {
        };
        
        ////////////////
        
        function getTotalAnswers() {
            var answers = 0;
            for (var letter in vm.answers) {
                answers += vm.answers[letter];
            }
            return answers;
        }
        
        function getStyle(key) {
            return { 'height': (vm.answers[key] / vm.getTotalAnswers()) * 100 + '%' };
        }
    }
})();
