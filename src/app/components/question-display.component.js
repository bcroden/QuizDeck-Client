(function() {
    'use strict';
    
    angular
        .module('app')
        .component('questionDisplay', {
            controller: Controller,
            templateUrl: 'app/components/question-display.html',
            bindings: {
                question: '=',
                isLast: '=',
                nextQuestion: '&',
                finishQuiz: '&'
            }
        })
    
    /* @ngInject */
    function Controller() {
        var vm = this;
        
        vm.getLetter = getLetter;
        
        ///////////////
        
        function getLetter(index) {
            return String.fromCharCode(65 + index);
        }
    }
})();
