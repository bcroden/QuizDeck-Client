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
    function Controller() {
        var vm = this;
        
        vm.getStopDate = getStopDate;
        
        vm.$onInit = function() {
            console.log(vm.completedQuizzes);
        }
        
        //////////////
        
        function getStopDate(quiz) {
            var date = new Date(quiz.stop)
            
            return (date.getMonth()+1) + "/" + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
        }
    }
})();
