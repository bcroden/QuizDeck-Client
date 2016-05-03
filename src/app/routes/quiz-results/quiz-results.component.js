(function() {
    'use strict';
    
    angular
        .module('app')
        .component('quizResults', {
            controller: Controller,
            templateUrl: 'app/routes/quiz-results/quiz-results.html',
            bindings: {
                completedQuiz: '='
            }
        });
    
    /* @ngInject */
    function Controller(dateService) {
        var vm = this;
        
        vm.getDateString = getDateString;
        
        vm.$onInit = function() {
            $(document).ready(function(){
                $('ul.tabs').tabs();
            });
        }
        
        //////////////
        
        function getDateString() {
            return dateService.toString(new Date(vm.completedQuiz.stop));
        }
    }
})();
