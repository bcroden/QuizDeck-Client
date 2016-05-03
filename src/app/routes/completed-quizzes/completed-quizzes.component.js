(function() {
    'use strict';
    
    angular
        .module('app')
        .component('completedQuizzes', {
            controller: Controller,
            templateUrl: 'app/routes/completed-quizzes/completed-quizzes.html',
            bindings: {
                completedQuizzes: '='
            }
        });
    
    /* @ngInject */
    function Controller(dateService) {
        var vm = this;
        
        vm.getStopDate = getStopDate;
        
        vm.$onInit = function() {
            console.log(vm.completedQuizzes);
        }
        
        //////////////
        
        function getStopDate(quiz) {
            return dateService.toString(new Date(quiz.stop));
        }
    }
})();
