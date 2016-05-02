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
    function Controller() {
        var vm = this;
        
        vm.$onInit = function() {
            $(document).ready(function(){
                $('ul.tabs').tabs();
            });
        }
        
        //////////////
        

    }
})();
